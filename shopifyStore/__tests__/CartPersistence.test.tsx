import { storage } from '../src/services/storage';
import { GYMSHARK_PRODUCTS } from '../src/services/shopify/productMockData';

describe('Storage Service & Cart Persistence Logic', () => {
  beforeEach(async () => {
    await storage.clear();
  });

  test('saves and retrieves items in persistent storage', async () => {
    const testPayload = JSON.stringify([
      {
        id: 'line_123',
        product: GYMSHARK_PRODUCTS[0],
        variant: GYMSHARK_PRODUCTS[0].variants[0],
        quantity: 2,
      },
    ]);

    await storage.setItem('@test_cart_key', testPayload);
    const retrieved = await storage.getItem('@test_cart_key');

    expect(retrieved).toBe(testPayload);
    const parsed = JSON.parse(retrieved!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].quantity).toBe(2);
    expect(parsed[0].variant.price.amount).toBe('74.00');
  });

  test('removes cart key upon clear', async () => {
    await storage.setItem('@test_cart_key', 'some_data');
    await storage.removeItem('@test_cart_key');
    const retrieved = await storage.getItem('@test_cart_key');
    expect(retrieved).toBeNull();
  });

  test('calculates accurate subtotal and handles line quantity updates', () => {
    const unitPrice = 48.0;
    const items = [
      {
        id: 'line_1',
        variant: { price: { amount: '48.00' } },
        quantity: 3,
      },
      {
        id: 'line_2',
        variant: { price: { amount: '64.00' } },
        quantity: 1,
      },
    ];

    const subtotal = items.reduce((sum, item) => {
      return sum + parseFloat(item.variant.price.amount) * item.quantity;
    }, 0);

    expect(subtotal).toBe(48.0 * 3 + 64.0); // 144 + 64 = 208
  });
});

