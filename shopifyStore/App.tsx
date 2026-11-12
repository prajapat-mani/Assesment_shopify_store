/**
 * Shopify White-Label Mobile Platform
 * Prototype targeting iOS & Android
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './src/context/StoreContext';
import { CartProvider } from './src/context/CartContext';
import { AppRouter } from './src/navigation/Router';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
