import { Product, ProductVariant } from '../../types/shopify';
import { StoreId } from '../../types/tenant';
import { GYMSHARK_PRODUCTS, AURA_WELLNESS_PRODUCTS } from './productMockData';

export interface DataFetchResult<T> {
  data: T | null;
  error: string | null;
}

class ShopifyService {
  private simulateNetworkError = false;

  setSimulateNetworkError(val: boolean) {
    this.simulateNetworkError = val;
  }

  getSimulateNetworkError(): boolean {
    return this.simulateNetworkError;
  }

  async fetchProducts(storeId: StoreId): Promise<Product[]> {
    // Simulate mobile network roundtrip
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 350));

    if (this.simulateNetworkError) {
      throw new Error('Shopify Storefront API: 503 Service Unavailable (Throttled or Offline)');
    }

    if (storeId === 'aura_wellness') {
      return [...AURA_WELLNESS_PRODUCTS];
    }
    if (storeId === 'gymshark') {
      return [...GYMSHARK_PRODUCTS];
    }
    // Custom onboarded merchant store: generate branded catalog
    return GYMSHARK_PRODUCTS.map((p) => ({
      ...p,
      id: `${p.id}_${storeId}`,
      vendor: storeId.replace(/_/g, ' ').toUpperCase(),
    }));
  }

  async fetchProductById(storeId: StoreId, productId: string): Promise<Product | null> {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

    if (this.simulateNetworkError) {
      throw new Error('Shopify Storefront API: Connection timed out');
    }

    const catalog = storeId === 'aura_wellness' ? AURA_WELLNESS_PRODUCTS : GYMSHARK_PRODUCTS;
    const found = catalog.find((p) => p.id === productId || `${p.id}_${storeId}` === productId);
    if (found) {
      return {
        ...found,
        id: productId,
        vendor: storeId.replace(/_/g, ' ').toUpperCase(),
      };
    }
    return null;
  }

  /**
   * Resolves the exact variant given a product and a dictionary of selected options.
   * e.g. { Color: 'Onyx Black', Size: 'XL' }
   */
  resolveVariant(product: Product, selectedOptions: Record<string, string>): ProductVariant | null {
    const keys = Object.keys(selectedOptions);
    for (const variant of product.variants) {
      const match = keys.every((key) => {
        const option = variant.selectedOptions.find((opt) => opt.name.toLowerCase() === key.toLowerCase());
        return option && option.value.toLowerCase() === selectedOptions[key].toLowerCase();
      });
      if (match) {
        return variant;
      }
    }
    return null;
  }
}

export const shopifyService = new ShopifyService();
