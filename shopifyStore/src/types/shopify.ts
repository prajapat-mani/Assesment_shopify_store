export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  selectedOptions: SelectedOption[];
  image?: {
    url: string;
    altText?: string;
  };
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  rating?: number;
  badgeText?: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
  product: {
    id: string;
    title: string;
    handle: string;
  };
  cost: {
    totalAmount: MoneyV2;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: MoneyV2;
    totalTaxAmount?: MoneyV2;
    totalAmount: MoneyV2;
  };
}

