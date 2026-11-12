import { shopifyService } from '../src/services/shopify/shopifyService';
import { GYMSHARK_PRODUCTS, AURA_WELLNESS_PRODUCTS } from '../src/services/shopify/productMockData';
import { reviewsAdapter } from '../src/services/integrations/reviewsAdapter';
import { loyaltyAdapter } from '../src/services/integrations/loyaltyAdapter';
import { STORE_CONFIGS, getStoreConfig } from '../src/config';

describe('Shopify Service & Variant Resolution', () => {
  beforeEach(() => {
    shopifyService.setSimulateNetworkError(false);
  });

  test('fetches Gymshark products catalog correctly', async () => {
    const products = await shopifyService.fetchProducts('gymshark');
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].vendor).toBe('Gymshark');
  });

  test('fetches Aura Wellness products catalog for fictional store', async () => {
    const products = await shopifyService.fetchProducts('aura_wellness');
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].vendor).toBe('Aura Wellness');
  });

  test('resolves in-stock variant correctly', () => {
    const product = GYMSHARK_PRODUCTS.find((p) => p.handle === 'apex-seamless-t-shirt')!;
    const resolved = shopifyService.resolveVariant(product, {
      Color: 'Onyx Black',
      Size: 'M',
    });

    expect(resolved).toBeDefined();
    expect(resolved?.sku).toBe('GS-APX-BLK-M');
    expect(resolved?.availableForSale).toBe(true);
  });

  test('identifies and resolves the UNAVAILABLE variant as Out of Stock', () => {
    const product = GYMSHARK_PRODUCTS.find((p) => p.handle === 'apex-seamless-t-shirt')!;
    const resolved = shopifyService.resolveVariant(product, {
      Color: 'Onyx Black',
      Size: 'XL',
    });

    expect(resolved).toBeDefined();
    expect(resolved?.sku).toBe('GS-APX-BLK-XL-OOS');
    expect(resolved?.availableForSale).toBe(false);
  });

  test('handles network failure simulation for Error/Retry screen testing', async () => {
    shopifyService.setSimulateNetworkError(true);
    await expect(shopifyService.fetchProducts('gymshark')).rejects.toThrow(
      'Shopify Storefront API: 503 Service Unavailable'
    );
  });
});

describe('Third-Party Integration Adapters (Reviews & Loyalty)', () => {
  test('reviews adapter returns verified reviews in ONLINE status', async () => {
    reviewsAdapter.setStatus('ONLINE');
    const result = await reviewsAdapter.getProductReviews('1001');
    expect(result.averageRating).toBe(4.9);
    expect(result.reviews.length).toBeGreaterThan(0);
    expect(result.reviews[0].verifiedBuyer).toBe(true);
  });

  test('reviews adapter throws graceful error in FALLBACK status', async () => {
    reviewsAdapter.setStatus('FALLBACK');
    await expect(reviewsAdapter.getProductReviews('1001')).rejects.toThrow(
      'Yotpo Reviews API Error: 502 Bad Gateway'
    );
  });

  test('loyalty adapter returns VIP perks in ONLINE status', async () => {
    loyaltyAdapter.setStatus('ONLINE');
    const result = await loyaltyAdapter.getCustomerLoyalty();
    expect(result.pointsBalance).toBe(450);
    expect(result.tierName).toContain('VIP');
  });

  test('loyalty adapter handles outage in FALLBACK status', async () => {
    loyaltyAdapter.setStatus('FALLBACK');
    await expect(loyaltyAdapter.getCustomerLoyalty()).rejects.toThrow(
      'Smile.io API unavailable'
    );
  });
});

describe('Multi-Tenant Configuration Engine', () => {
  test('Gymshark store configuration has authentic theme and reviews enabled', () => {
    const config = getStoreConfig('gymshark');
    expect(config.id).toBe('gymshark');
    expect(config.theme.colors.background).toBe('#FFFFFF');
    expect(config.features.showReviews).toBe(true);
    expect(config.features.showLoyaltyRewards).toBe(false);
  });

  test('Aura Wellness store configuration has light botanical theme and loyalty enabled', () => {
    const config = getStoreConfig('aura_wellness');
    expect(config.id).toBe('aura_wellness');
    expect(config.theme.dark).toBe(false);
    expect(config.theme.colors.background).toBe('#FAF8F5');
    expect(config.features.showReviews).toBe(false);
    expect(config.features.showLoyaltyRewards).toBe(true);
  });
});

