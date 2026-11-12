# White-Label Shopify Mobile Platform (React Native)

A production-grade, multi-tenant mobile platform architecture and React Native prototype that transforms independent Shopify stores into fully branded iOS and Android native apps using a single shared codebase.

---

## Deliverables Summary

| Deliverable | File Link | Description |
| :--- | :--- | :--- |
| **Task 1: Architecture & Integration Plan** | [ARCHITECTURE.md](file:///Users/macbookpro/Desktop/shopify_Assesment/ARCHITECTURE.md) | High-level system architecture, Mermaid diagrams, Shopify API strategy, CI/CD pipeline, and 10-category 3rd-party compatibility matrix. |
| **Task 2: React Native Prototype** | [shopifyStore/](file:///Users/macbookpro/Desktop/shopify_Assesment/shopifyStore) | Complete TypeScript React Native application with multi-tenant theming, variant matrix with out-of-stock handling, persistent cart, and integration fallbacks. |
| **3-Minute Walkthrough Script** | [WALKTHROUGH.md](file:///Users/macbookpro/Desktop/shopify_Assesment/WALKTHROUGH.md) | Minute-by-minute demonstration guide covering the shopping journey, store configuration change, and integration fallback. |

---

## Architecture Highlights

1. **Shared Codebase, Zero Screen Forks:** 
   All UI screens consume design tokens, typography scales, radii, and feature flags dynamically from `StoreContext` (`TenantConfig`). Switching from **Gymshark** (dark athletic, uppercase, reviews enabled) to **Aura Wellness** (earthy botanical, pill buttons, loyalty rewards enabled) occurs dynamically at runtime without modifying a single line of screen component code.

2. **Decoupled Data Layer & Shopify Storefront GraphQL:**
   The UI interacts exclusively through `shopifyService`, keeping networking separate from presentations. The repository includes real Shopify Storefront GraphQL operations (API version 2024-10) for catalog retrieval and cart mutations (`cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`).

3. **Cart Persistence Across Restarts:**
   Persistent storage adapter backed by `@react-native-async-storage/async-storage` saves and restores cart items, maintaining variants, quantities, and prices across app launches.

4. **Unavailable Variant Handling:**
   Full variant matrix evaluation with multi-dimensional option resolution (Size & Color). When an out-of-stock combination is chosen (e.g. `Onyx Black / XL`), the app displays an "Out of Stock" status banner and safely disables the "Add to Cart" CTA.

5. **Third-Party Integration Fallback:**
   Demonstrates resilience against third-party outages (Yotpo Reviews & Smile.io Loyalty). When an external vendor experiences downtime (502/timeout), the app catches the error and degrades gracefully: displaying a non-blocking fallback banner while keeping catalog browsing and checkout 100% operational.

---

## Setup & Run Instructions

### Prerequisites
- Node.js >= 20 (Tested on Node v23.4.0)
- npm >= 10
- Watchman (recommended for native iOS/Android development)
- CocoaPods (for iOS) & Android Studio / JDK 17 (for Android)

### Quick Start
```bash
# 1. Navigate to the React Native project
cd shopifyStore

# 2. Dependencies are already installed. If reinstalling:
npm install

# 3. Run all automated test suites (15 tests covering Cart, Theming, Variants & Integrations)
npm test

# 4. Run TypeScript static type check
npx tsc --noEmit
```

### Running on Mobile Simulators / Devices
```bash
# Start Metro bundler:
npm start

# In a separate terminal:
# Run on iOS Simulator:
npm run ios

# Run on Android Emulator:
npm run android
```

---

## Interactive Evaluator Controls

The app includes dedicated evaluation tools right inside the UI:
1. **Store Switcher (Top Left Header Pill):**
   - Tap **"⚡ Gymshark"** or **"🌿 Aura"** in the top header.
   - Switch between **Gymshark** (Dark athletic) and **Aura Wellness** (Earthy botanical) to inspect instant white-label theming.
2. **Evaluator Simulation Toggles (Inside Switcher Modal):**
   - **Simulate API Error:** Triggers a simulated 503 Storefront API failure to demonstrate the **Error & Retry State**.
   - **3rd-Party Outage Fallback:** Simulates external provider downtime (502 Bad Gateway) to test **Graceful Degradation** on Reviews and Loyalty widgets.
3. **Product Out-of-Stock Test:**
   - On the Gymshark *Apex Seamless T-Shirt*, select **Color: Onyx Black** and **Size: XL**.
   - Observe the live variant matrix resolve to **Out of Stock**, disabling the Add to Cart button.
4. **Production Checkout Explanation Modal:**
   - Add items to your bag, open the Cart, and tap **"Proceed to Checkout →"**.
   - Opens an architectural breakdown explaining how production checkout operates via the **Shopify Checkout Sheet Kit**, native Apple Pay/Google Pay biometric authentication, and webhook reconciliation.

---

## Automated Test Coverage

The test suite runs 15 automated test cases across 3 suites:
- `__tests__/App.test.tsx`: Verifies clean component mounting and provider resolution.
- `__tests__/ShopifyServiceAndIntegrations.test.tsx`:
  - Catalog retrieval for Gymshark and Aura Wellness
  - In-stock vs. out-of-stock variant resolution
  - Simulated network failure handling
  - Reviews adapter online vs. fallback states
  - Loyalty adapter online vs. fallback states
  - Multi-tenant config token verification
- `__tests__/CartPersistence.test.tsx`:
  - Cart item persistence in storage
  - Cart clearing and item removal
  - Subtotal and price calculation fidelity

Run tests anytime with:
```bash
cd shopifyStore && npm test
```

---

## Submission Reflection

- **Platforms Tested:**
  - Tested on macOS with React Native 0.88.1, React 19.3.0, Node.js v23.4.0, Metro bundler, and Jest.
  - Fully type-checked (`tsc --noEmit` exits with 0 errors).
  - All unit and integration suites passing (`15/15 passed`).
- **AI Tools Used:**
  - Used Antigravity AI agent for architecture planning, design token structuring, Storefront GraphQL schema drafting, and automated test authoring.
- **One Issue Corrected:**
  - During TypeScript verification, strict callback signatures in `setTimeout` inside Promises (`resolve` expecting `void`) and `ButtonProps.style` array typing (`StyleProp<ViewStyle>`) were caught and refactored to adhere to strict React Native 0.88 TypeScript typing.
- **Time Spent:**
  - ~3 hours total (Task 1 Architecture: 1 hour, Task 2 Prototype & Tests: 1.75 hours, Documentation & Walkthrough: 0.25 hours).
- **Unfinished Items:**
  - Real Apple Pay sandbox processing (omitted as specified by assignment guidelines; explained in checkout modal and architecture document).

