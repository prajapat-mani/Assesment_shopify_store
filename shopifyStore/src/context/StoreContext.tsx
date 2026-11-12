import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TenantConfig, StoreId } from '../types/tenant';
import { STORE_CONFIGS, DEFAULT_STORE_ID, getStoreConfig } from '../config';
import { storage } from '../services/storage';

interface StoreContextValue {
  storeId: StoreId;
  config: TenantConfig;
  switchStore: (newStoreId: StoreId) => Promise<void>;
  onboardStore: (newConfig: TenantConfig) => Promise<void>;
  availableStores: TenantConfig[];
  isSwitching: boolean;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORE_STORAGE_KEY = '@shopify_platform_store_id';
const CUSTOM_STORES_STORAGE_KEY = '@shopify_platform_custom_stores';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeId, setStoreId] = useState<StoreId>(DEFAULT_STORE_ID);
  const [customStores, setCustomStores] = useState<Record<string, TenantConfig>>({});
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  useEffect(() => {
    async function loadSavedState() {
      try {
        const rawCustom = await storage.getItem(CUSTOM_STORES_STORAGE_KEY);
        let parsedCustom: Record<string, TenantConfig> = {};
        if (rawCustom) {
          parsedCustom = JSON.parse(rawCustom);
          setCustomStores(parsedCustom);
        }

        const saved = await storage.getItem(STORE_STORAGE_KEY);
        if (saved && (saved === 'gymshark' || saved === 'aura_wellness' || parsedCustom[saved])) {
          setStoreId(saved as StoreId);
        }
      } catch {
        // Fallback to default
      }
    }
    loadSavedState();
  }, []);

  const switchStore = async (newStoreId: StoreId) => {
    setIsSwitching(true);
    setStoreId(newStoreId);
    await storage.setItem(STORE_STORAGE_KEY, newStoreId);
    // Allow brief microtask for smooth layout re-render
    setTimeout(() => {
      setIsSwitching(false);
    }, 150);
  };

  const onboardStore = async (newConfig: TenantConfig) => {
    setIsSwitching(true);
    const updated = { ...customStores, [newConfig.id]: newConfig };
    setCustomStores(updated);
    setStoreId(newConfig.id);
    try {
      await storage.setItem(CUSTOM_STORES_STORAGE_KEY, JSON.stringify(updated));
      await storage.setItem(STORE_STORAGE_KEY, newConfig.id);
    } catch {
      // Safe fallback
    }
    setTimeout(() => {
      setIsSwitching(false);
    }, 150);
  };

  const config = customStores[storeId] || getStoreConfig(storeId);

  const availableStores = [
    STORE_CONFIGS.gymshark,
    STORE_CONFIGS.aura_wellness,
    ...Object.values(customStores),
  ];

  return (
    <StoreContext.Provider
      value={{
        storeId,
        config,
        switchStore,
        onboardStore,
        availableStores,
        isSwitching,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextValue => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

