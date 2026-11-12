import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Product } from '../types/shopify';
import { useStore } from '../context/StoreContext';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';

export type ScreenType = 'welcome' | 'home' | 'product_detail' | 'cart';

export const AppRouter: React.FC = () => {
  const { config } = useStore();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const navigateToProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
  };

  const navigateToCart = () => {
    setCurrentScreen('cart');
  };

  const handleBack = () => {
    if (currentScreen === 'cart') {
      setCurrentScreen(selectedProduct ? 'product_detail' : 'home');
    } else if (currentScreen === 'product_detail') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('welcome');
    }
  };

  // Android hardware back button and swipe back gesture support
  useEffect(() => {
    const onBackPress = () => {
      if (currentScreen === 'cart') {
        setCurrentScreen(selectedProduct ? 'product_detail' : 'home');
        return true;
      }
      if (currentScreen === 'product_detail') {
        setCurrentScreen('home');
        return true;
      }
      if (currentScreen === 'home') {
        setCurrentScreen('welcome');
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [currentScreen, selectedProduct]);

  return (
    <View style={[styles.container, { backgroundColor: config.theme.colors.background }]}>
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onContinue={navigateToHome}
          onSkip={navigateToHome}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onSelectProduct={navigateToProductDetail}
          onOpenCart={navigateToCart}
        />
      )}

      {currentScreen === 'product_detail' && selectedProduct && (
        <ProductDetailScreen
          key={`${selectedProduct.id}_${config.id}`}
          product={selectedProduct}
          onBack={handleBack}
          onOpenCart={navigateToCart}
        />
      )}

      {currentScreen === 'cart' && (
        <CartScreen
          onBack={handleBack}
          onExploreProducts={navigateToHome}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

