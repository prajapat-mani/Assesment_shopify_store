import { TenantConfig, StoreId } from '../types/tenant';
import { gymsharkConfig } from './gymshark.config';
import { auraWellnessConfig } from './auraWellness.config';

export const STORE_CONFIGS: Record<StoreId, TenantConfig> = {
  gymshark: gymsharkConfig,
  aura_wellness: auraWellnessConfig,
};

export const DEFAULT_STORE_ID: StoreId = 'gymshark';

export function getStoreConfig(storeId: StoreId): TenantConfig {
  return STORE_CONFIGS[storeId] || STORE_CONFIGS[DEFAULT_STORE_ID];
}

