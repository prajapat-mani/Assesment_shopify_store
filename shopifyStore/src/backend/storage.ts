import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private memoryFallback: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    try {
      if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
        const val = await AsyncStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // Degrade gracefully to in-memory fallback
    }
    return this.memoryFallback.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.memoryFallback.set(key, value);
    try {
      if (AsyncStorage && typeof AsyncStorage.setItem === 'function') {
        await AsyncStorage.setItem(key, value);
      }
    } catch {
      // Gracefully silent in offline or restricted environments
    }
  }

  async removeItem(key: string): Promise<void> {
    this.memoryFallback.delete(key);
    try {
      if (AsyncStorage && typeof AsyncStorage.removeItem === 'function') {
        await AsyncStorage.removeItem(key);
      }
    } catch {
      // Gracefully silent
    }
  }

  async clear(): Promise<void> {
    this.memoryFallback.clear();
    try {
      if (AsyncStorage && typeof AsyncStorage.clear === 'function') {
        await AsyncStorage.clear();
      }
    } catch {
      // Gracefully silent
    }
  }
}

export const storage = new StorageService();

