# App Walkthrough Guide

This document explains the complete step-by-step flow of our white-label Shopify mobile application, from the moment the app opens to checkout, along with the architecture and files used.

---

## Step 1: App Launch and Welcome Screen

When the app opens, the user lands on the Welcome Screen (WelcomeScreen.tsx).
- The screen loads the active brand theme dynamically. By default, it displays the Gymshark athletic dark theme, background image, and tagline.
- In the top-right corner, an animated SKIP button gently nudges horizontally so users know they can jump straight to shopping.
- Tapping either the SKIP button or the main Explore Collection button navigates directly to the Home Screen.

What we used here:
- WelcomeScreen.tsx for the user interface.
- React Native Animated API for the looping horizontal button nudge.
- StoreContext.tsx to inject the active brand tokens and background image.

---

## Step 2: Home Screen and Catalog Browsing

The Home Screen (HomeScreen.tsx) shows the complete storefront catalog.
- At the top, a custom Header displays the store badge (Gymshark) and shopping bag icon with a live item counter.
- A branded Hero Banner displays collection highlights.
- Category filter chips allow filtering by product types such as Leggings, Skincare, or Accessories.
- Products are rendered in a clean two-column grid using ProductCard.tsx.

Product Card features:
- Shows the product title, image, price, and star rating.
- If an item is already in the bag, a floating in-bag badge appears on the image.
- Beside the price, an interactive quantity stepper allows increasing (+) or decreasing (-) items directly from the card without opening the details screen.

What we used here:
- HomeScreen.tsx and ProductCard.tsx.
- shopifyService.ts to fetch products from the Shopify Storefront API.
- CartContext.tsx to synchronize in-bag quantities directly on the card.

---

## Step 3: Live Store Switching (Gymshark and Aura Wellness)

Users can switch between different brand storefronts at runtime without reloading or recompiling the application.
- Tapping the store badge in the top-left header opens the Store Switcher Modal (StoreSwitcherModal.tsx).
- Selecting Aura Wellness instantly re-skins the entire app:
  - Background color changes from dark black to warm cream.
  - Primary brand color changes to forest green.
  - Logo changes from the SharkMark to the Botanical Leaf emblem.
  - The catalog immediately reloads to show organic face oils and wellness products.
  - An Aura VIP Club rewards banner powered by Smile.io appears on the home screen.

What we used here:
- StoreSwitcherModal.tsx for the selection interface.
- StoreContext.tsx to manage the active store ID and configuration.
- gymshark.config.ts and auraWellness.config.ts for the independent brand token files.

---

## Step 4: Product Detail Screen and Out-of-Stock Fallback

When a user taps any product card, the Product Detail Screen (ProductDetailScreen.tsx) opens.
- It displays a swipeable multi-image carousel with pagination dots.
- Users can choose options like Color and Size using the VariantSelector.tsx component.
- The quantity stepper allows picking the exact quantity before adding to the bag.

Out-of-Stock Fallback Logic:
- If a customer selects an unavailable variant, such as Gymshark Size L in Soft Brown:
  - The Size L button is crossed out with a line-through and an Out of Stock (OOS) tag.
  - A warning banner appears stating the variant is currently unavailable.
  - The stock indicator turns red and reads Out of Stock.
  - The Add to Bag button disables and changes to Sold Out.
  - A Notify Me When Restocked button appears so the customer can save an alert instead of facing a dead end.

What we used here:
- ProductDetailScreen.tsx and VariantSelector.tsx.
- shopifyService.resolveVariant to resolve the user-selected variant matrix in real time.
- productMockData.ts containing live variant availability flags.

---

## Step 5: Merchant Onboarding and Shopify Authorization Hub

Our platform allows new merchants to connect their Shopify stores through a dedicated onboarding flow.
- From the Store Switcher Modal, tapping Onboard New Store opens the Merchant Onboarding Modal (MerchantOnboardingModal.tsx).
- Quick presets are available for brands like Alo Yoga, Allbirds, and Kith NYC, or merchants can enter a custom brand name and Shopify domain.
- The screen verifies the Shopify Partner OAuth connection and displays the granted Storefront API scopes: read product listings, write checkouts, and write customers.

Zero-Trust Security Architecture:
- High-risk Shopify Admin API keys are completely excluded from the mobile app to eliminate hacking risks.
- Only public, scoped Storefront tokens are used.
- Tokens and customer sessions are encrypted using hardware-backed security (iOS Keychain and Android Keystore).
- Tapping Connect and Launch immediately registers the new merchant and switches the entire app to that brand.

What we used here:
- MerchantOnboardingModal.tsx.
- Dynamic tenant registration inside StoreContext.tsx.
- Scoped Storefront OAuth contracts.

---

## Step 6: Shopping Cart, Backend Storage, and Express Checkout

When items are added to the bag, tapping the bag icon opens the Express Checkout Modal (CheckoutModal.tsx).
- Displays all cart line items, selected variants, item quantities, and subtotal calculation.
- Includes pre-filled express shipping details.
- Customers can complete their purchase using Shop Pay, Apple Pay, or standard card checkout.
- Once placed, an Order Confirmed screen displays the order number, delivery timeline, and a return-to-shop action.

Backend and Offline Persistence:
- All cart items and store preferences are saved locally on the device inside src/backend/storage.ts.
- Using AsyncStorage with store-specific keys, cart data survives app restarts and works completely offline.
- Even if the network drops, the customer never loses their selected items.

What we used here:
- CheckoutModal.tsx and CartContext.tsx.
- src/backend/storage.ts using AsyncStorage.
- Shopify Checkout Sheet Kit integration architecture.

---

## Summary of Technologies and Files Used

1. Core Framework:
- React Native with TypeScript.
- Safe Area Context for modern device insets.

2. State and Context Management:
- StoreContext.tsx for multi-tenant brand switching.
- CartContext.tsx for shopping bag operations.

3. App Screens:
- WelcomeScreen.tsx for branded onboarding.
- HomeScreen.tsx for product grid and category filtering.
- ProductDetailScreen.tsx for variant resolution and perks.
- CheckoutModal.tsx for express order completion.

4. Data and Backend Layer:
- src/backend/storage.ts for offline persistent storage.
- shopifyService.ts for Shopify Storefront GraphQL queries.
- productMockData.ts for live store catalogs.

5. Third-Party Adapters:
- reviewsAdapter.ts for Yotpo and Judge.me ratings.
- loyaltyAdapter.ts for Smile.io rewards points.
