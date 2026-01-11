/**
 * Centralized storage service abstraction for Chrome extension storage.
 * Provides generic methods for storage operations with error handling.
 */

/**
 * Generic method to get a value from Chrome storage.
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Promise that resolves with the stored value or default value
 */
export async function getStorage<T>(key: string, defaultValue: T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(result[key] !== undefined ? result[key] : defaultValue);
    });
  });
}

/**
 * Generic method to set a value in Chrome storage.
 * @param key - Storage key
 * @param value - Value to store
 * @returns Promise that resolves when storage is set
 */
export async function setStorage<T>(key: string, value: T): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}
