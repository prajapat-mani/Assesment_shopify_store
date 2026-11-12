import { Product } from '../../types/shopify';

export const GYMSHARK_PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/1010',
    title: 'SoftSense™ Mid-Rise Flared Leggings',
    subtitle: 'Regular · Soft Brown',
    rating: 4.7,
    badgeText: 'made for the studio',
    handle: 'softsense-mid-rise-flared-leggings',
    description:
      'Our new premium, super soft fabric that responds to your movement in the moment. Featuring a flattering mid-rise waistband, flared leg silhouette, and buttery-smooth brushed interior.',
    vendor: 'Gymshark',
    productType: 'Leggings',
    tags: ['SoftSense™', 'Studio', 'Pilates'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '74.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '74.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-ss-1',
        url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
        altText: 'SoftSense Mid-Rise Flared Leggings Soft Brown',
      },
      {
        id: 'img-ss-1b',
        url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
        altText: 'SoftSense Studio Movement',
      },
    ],
    options: [
      { id: 'opt-color-ss1', name: 'Color', values: ['Soft Brown', 'Onyx Black', 'Slate Grey'] },
      { id: 'opt-size-ss1', name: 'Size', values: ['XS', 'S', 'M', 'L'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1010-brn-s',
        title: 'Soft Brown / S',
        sku: 'GS-SS-FLR-BRN-S',
        availableForSale: true,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'S' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1010-brn-m',
        title: 'Soft Brown / M',
        sku: 'GS-SS-FLR-BRN-M',
        availableForSale: true,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'M' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1010-brn-l',
        title: 'Soft Brown / L',
        sku: 'GS-SS-FLR-BRN-L',
        availableForSale: false,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'L' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1010-blk-s',
        title: 'Onyx Black / S',
        sku: 'GS-SS-FLR-BLK-S',
        availableForSale: false,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'S' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1010-blk-m',
        title: 'Onyx Black / M',
        sku: 'GS-SS-FLR-BLK-M',
        availableForSale: true,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'M' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1010-blk-l',
        title: 'Onyx Black / L',
        sku: 'GS-SS-FLR-BLK-L',
        availableForSale: true,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'L' },
        ],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/1011',
    title: 'SoftSense™ Mid-Rise Leggings',
    subtitle: 'Regular · Soft Brown',
    rating: 5.0,
    badgeText: 'made for the studio',
    handle: 'softsense-mid-rise-leggings',
    description:
      'Classic 7/8 ankle-length studio leggings made with four-way stretch SoftSense™ micro-poly for distraction-free yoga, pilates, and conditioning.',
    vendor: 'Gymshark',
    productType: 'Leggings',
    tags: ['SoftSense™', 'Studio', 'Pilates'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '70.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '70.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-ss-2',
        url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop',
        altText: 'SoftSense Mid-Rise Leggings Front',
      },
    ],
    options: [
      { id: 'opt-color-ss2', name: 'Color', values: ['Soft Brown', 'Onyx Black'] },
      { id: 'opt-size-ss2', name: 'Size', values: ['S', 'M', 'L'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1011-brn-s',
        title: 'Soft Brown / S',
        sku: 'GS-SS-LEG-BRN-S',
        availableForSale: true,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'S' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1011-brn-m',
        title: 'Soft Brown / M',
        sku: 'GS-SS-LEG-BRN-M',
        availableForSale: true,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'M' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1011-brn-l',
        title: 'Soft Brown / L',
        sku: 'GS-SS-LEG-BRN-L',
        availableForSale: false,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Soft Brown' },
          { name: 'Size', value: 'L' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1011-blk-s',
        title: 'Onyx Black / S',
        sku: 'GS-SS-LEG-BLK-S',
        availableForSale: false,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'S' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1011-blk-m',
        title: 'Onyx Black / M',
        sku: 'GS-SS-LEG-BLK-M',
        availableForSale: true,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'M' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1011-blk-l',
        title: 'Onyx Black / L',
        sku: 'GS-SS-LEG-BLK-L',
        availableForSale: true,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'L' },
        ],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/1012',
    title: 'SoftSense™ High-Rise Leggings',
    subtitle: 'Regular · Soft Brown',
    rating: 3.8,
    badgeText: 'made for the studio',
    handle: 'softsense-high-rise-leggings',
    description:
      'High-coverage reinforced waistband that stays in place through every forward bend and squat without rolling down.',
    vendor: 'Gymshark',
    productType: 'Leggings',
    tags: ['SoftSense™', 'Studio', 'High-Rise'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '70.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '70.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-ss-3',
        url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
        altText: 'SoftSense High-Rise Leggings',
      },
    ],
    options: [
      { id: 'opt-size-ss3', name: 'Size', values: ['XS', 'S', 'M'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1012-m',
        title: 'Soft Brown / M',
        sku: 'GS-SS-HR-BRN-M',
        availableForSale: true,
        price: { amount: '70.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/1013',
    title: 'SoftSense™ High-Rise Straight Leg Leggings',
    subtitle: 'Regular · Soft Brown',
    rating: 4.5,
    badgeText: 'made for the studio',
    handle: 'softsense-high-rise-straight-leg',
    description:
      'A sleek straight-leg cut from hip to hem with zero hem drag. Designed to transition seamlessly from studio reformer to street style.',
    vendor: 'Gymshark',
    productType: 'Leggings',
    tags: ['SoftSense™', 'Studio', 'Straight Leg'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '74.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '74.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-ss-4',
        url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop',
        altText: 'Straight Leg Studio Leggings',
      },
    ],
    options: [{ id: 'opt-size-ss4', name: 'Size', values: ['S', 'M', 'L'] }],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1013-m',
        title: 'Soft Brown / M',
        sku: 'GS-SS-STR-BRN-M',
        availableForSale: true,
        price: { amount: '74.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/1001',
    title: 'Apex Seamless T-Shirt',
    subtitle: 'Slim Fit · Onyx Black',
    rating: 4.9,
    badgeText: 'best seller',
    handle: 'apex-seamless-t-shirt',
    description:
      'Engineered for maximum breathability and unrestricted movement during high-intensity conditioning. Features body-mapped jacquard ventilation, sweat-wicking tech, and anti-chafing ergonomic seams.',
    vendor: 'Gymshark',
    productType: 'Apparel',
    tags: ['Best Seller', 'Conditioning', 'Seamless'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '48.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '48.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
        altText: 'Apex Seamless T-Shirt Front',
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
        altText: 'Apex Seamless Texture',
      },
    ],
    options: [
      { id: 'opt-color', name: 'Color', values: ['Onyx Black', 'Core Grey', 'Atlantic Blue'] },
      { id: 'opt-size', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1001-blk-s',
        title: 'Onyx Black / S',
        sku: 'GS-APX-BLK-S',
        availableForSale: true,
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'S' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1001-blk-m',
        title: 'Onyx Black / M',
        sku: 'GS-APX-BLK-M',
        availableForSale: true,
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'M' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1001-blk-l',
        title: 'Onyx Black / L',
        sku: 'GS-APX-BLK-L',
        availableForSale: true,
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'L' },
        ],
      },
      // Out of Stock Variant
      {
        id: 'gid://shopify/ProductVariant/1001-blk-xl',
        title: 'Onyx Black / XL',
        sku: 'GS-APX-BLK-XL-OOS',
        availableForSale: false,
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Onyx Black' },
          { name: 'Size', value: 'XL' },
        ],
      },
      {
        id: 'gid://shopify/ProductVariant/1001-gry-m',
        title: 'Core Grey / M',
        sku: 'GS-APX-GRY-M',
        availableForSale: true,
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Core Grey' },
          { name: 'Size', value: 'M' },
        ],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/1002',
    title: 'Crest Oversized Hoodie',
    subtitle: 'Oversized · Washed Black',
    rating: 4.8,
    badgeText: 'rest day',
    handle: 'crest-oversized-hoodie',
    description:
      'The classic rest-day essential. Crafted from premium 400 GSM brushed-back fleece for substantial warmth and a relaxed silhouette.',
    vendor: 'Gymshark',
    productType: 'Apparel',
    tags: ['Rest Day', 'Heavyweight', 'Fleece'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '64.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '64.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
        altText: 'Crest Hoodie Front',
      },
    ],
    options: [
      { id: 'opt-color-h', name: 'Color', values: ['Washed Black', 'Bone White'] },
      { id: 'opt-size-h', name: 'Size', values: ['S', 'M', 'L'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1002-blk-m',
        title: 'Washed Black / M',
        sku: 'GS-CRST-BLK-M',
        availableForSale: true,
        price: { amount: '64.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [
          { name: 'Color', value: 'Washed Black' },
          { name: 'Size', value: 'M' },
        ],
      },
    ],
  },
];

export const AURA_WELLNESS_PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/2001',
    title: 'Clarity Face Nectar',
    subtitle: 'Cold-Pressed · 30ml',
    rating: 4.9,
    badgeText: 'clean beauty',
    handle: 'clarity-face-nectar',
    description:
      'Cold-pressed jojoba, rosehip, and blue tansy oil that restores the skin barrier and provides a dewy, non-comedogenic glow.',
    vendor: 'Aura Wellness',
    productType: 'Skincare',
    tags: ['Organic', 'Cold-Pressed', 'Clean Beauty'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '56.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '88.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'aura-img1',
        url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
        altText: 'Clarity Face Nectar Glass Dropper Bottle',
      },
      {
        id: 'aura-img2',
        url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop',
        altText: 'Pure Organic Essence and Natural Ingredients',
      },
    ],
    options: [{ id: 'opt-size-oil', name: 'Volume', values: ['30ml / 1 oz', '60ml / 2 oz (Refill)'] }],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2001-30ml',
        title: '30ml / 1 oz',
        sku: 'AURA-OIL-30',
        availableForSale: true,
        price: { amount: '56.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Volume', value: '30ml / 1 oz' }],
      },
      // Out of Stock Refill Variant
      {
        id: 'gid://shopify/ProductVariant/2001-60ml',
        title: '60ml / 2 oz (Refill)',
        sku: 'AURA-OIL-60-OOS',
        availableForSale: false,
        price: { amount: '88.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Volume', value: '60ml / 2 oz (Refill)' }],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/2002',
    title: 'Hand-Poured Hinoki & Moss Candle',
    subtitle: 'Ceramic Vessel · 9 oz',
    rating: 4.8,
    badgeText: 'clean burn',
    handle: 'hinoki-moss-candle',
    description:
      'Sustainably sourced Japanese Hinoki cedarwood, earthy oakmoss, and white amber set in a reusable ceramic vessel with a crackling wooden wick.',
    vendor: 'Aura Wellness',
    productType: 'Home Fragrance',
    tags: ['Aromatherapy', 'Soy Wax'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '42.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '42.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'aura-img3',
        url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
        altText: 'Hand-Poured Hinoki and Moss Candle in Ceramic Cup',
      },
      {
        id: 'aura-img4',
        url: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=800&auto=format&fit=crop',
        altText: 'Ceramic Candle Warm Ambiance',
      },
    ],
    options: [{ id: 'opt-size-cndl', name: 'Size', values: ['Standard (9 oz)'] }],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2002-std',
        title: 'Standard (9 oz)',
        sku: 'AURA-CNDL-9',
        availableForSale: true,
        price: { amount: '42.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Size', value: 'Standard (9 oz)' }],
      },
    ],
  },
  {
    id: 'gid://shopify/Product/2003',
    title: 'Lavender & Clary Sage Bath Salts',
    subtitle: 'Dead Sea Minerals · 400g',
    rating: 4.7,
    badgeText: 'mineral soak',
    handle: 'lavender-clary-sage-bath-salts',
    description:
      'Unrefined Dead Sea salt infused with organic French lavender, clary sage essential oils, and dried organic cornflower petals.',
    vendor: 'Aura Wellness',
    productType: 'Body Care',
    tags: ['Aromatherapy', 'Bath', 'Minerals'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '36.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '36.00', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'aura-img5',
        url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
        altText: 'Lavender and Clary Sage Bath Soak Glass Jar',
      },
    ],
    options: [{ id: 'opt-size-salt', name: 'Weight', values: ['400g Jar'] }],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2003-jar',
        title: '400g Jar',
        sku: 'AURA-SALT-400',
        availableForSale: true,
        price: { amount: '36.00', currencyCode: 'USD' },
        compareAtPrice: null,
        selectedOptions: [{ name: 'Weight', value: '400g Jar' }],
      },
    ],
  },
];
