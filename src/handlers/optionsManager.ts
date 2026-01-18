/**
 * Options Manager
 *
 * Handles options loading, storage change listeners, and applying options to the page.
 */

import { OptionsTypes, applyDarkMode, removeDarkMode, autoConnect, skipIntro } from "../utilities";
import { injectStylesheet } from "../utilities";
import { loadHotkeysConfig } from "../utilities";
import { HotkeyEntry } from "../types";
import { DOMElementCache } from "./domElementCache";
import { Logger } from "../services";

const debug = new Logger("optionsManager");

/**
 * Callback interface for options manager events.
 * Used to notify the content script when hotkeys are loaded or cleared.
 */
export interface OptionsManagerCallbacks {
  onHotkeysLoaded: (hotkeys: HotkeyEntry[]) => void;
  onHotkeysCleared: () => void;
}

/**
 * Initializes options from Chrome storage and applies them to the page.
 * Loads options, applies dark mode stylesheet, loads hotkeys if enabled,
 * and applies page-specific options like skipIntro and autoConnect.
 *
 * @param cache - DOM element cache containing page elements
 * @param callbacks - Callbacks to notify when hotkeys are loaded or cleared
 * @returns Promise that resolves to the loaded options configuration
 */
export async function initializeOptions(
  cache: DOMElementCache,
  callbacks: OptionsManagerCallbacks
): Promise<OptionsTypes> {
  injectStylesheet("dark-mode.css");

  return new Promise<OptionsTypes>((resolve) => {
    chrome.storage.sync.get("options", async (result) => {
      const options = result.options as OptionsTypes;

      if (options && options.disableAllOptions) {
        // When disableAllOptions is true, disable all functionality and ensure dark mode is off
        options.disableHotkeys = true;
        options.skipIntro = false;
        options.autoConnect = false;
        options.isNightMode = false;
        removeDarkMode();
        callbacks.onHotkeysCleared();
      } else {
        if (options.disableHotkeys) {
          callbacks.onHotkeysCleared();
        } else {
          const hotkeys = await loadHotkeysConfig();
          callbacks.onHotkeysLoaded(hotkeys);
        }

        if (
          options?.skipIntro &&
          options.autoConnect &&
          cache.skipIntroButton &&
          cache.enterButton
        ) {
          autoConnect(cache.skipIntroButton, cache.enterButton);
        }
        if (options?.skipIntro && cache.skipIntroButton) {
          skipIntro(cache.skipIntroButton);
        }
        if (options?.autoConnect && cache.skipIntroButton && cache.enterButton) {
          autoConnect(cache.skipIntroButton, cache.enterButton);
        }
        if (options && options.isNightMode) applyDarkMode();
        if (options && !options.isNightMode) removeDarkMode();
      }

      resolve(options);
    });
  });
}

/**
 * Sets up Chrome storage change listener to handle options updates in real-time.
 * Watches for changes to the 'options' key in Chrome storage and applies them immediately.
 * Updates dark mode, hotkeys, skipIntro, and autoConnect based on new option values.
 *
 * @param cache - DOM element cache containing page elements
 * @param callbacks - Callbacks to notify when hotkeys are loaded or cleared
 */
export function setupOptionsChangeListener(
  cache: DOMElementCache,
  callbacks: OptionsManagerCallbacks
): void {
  chrome.storage.onChanged.addListener(
    (changes: Record<string, chrome.storage.StorageChange>, namespace: string) => {
      if (namespace === "sync") {
        if (changes.options && "newValue" in changes.options) {
          const newOptions = changes.options.newValue as OptionsTypes;
          debug.log("Options have changed:", newOptions);

          if (newOptions.disableAllOptions) {
            // When disableAllOptions is true, disable all functionality and ensure dark mode is off
            newOptions.skipIntro = false;
            newOptions.autoConnect = false;
            newOptions.isNightMode = false;
            removeDarkMode();
            callbacks.onHotkeysCleared();
          } else {
            if (newOptions.disableHotkeys) {
              callbacks.onHotkeysCleared();
            } else {
              loadHotkeysConfig().then((hotkeys) => {
                callbacks.onHotkeysLoaded(hotkeys);
              });
            }
            // Each option is guarded by its feature flag and DOM element existence checks to prevent
            // null-reference errors when elements aren't rendered on the current page.
            if (
              newOptions.skipIntro &&
              newOptions.autoConnect &&
              cache.skipIntroButton &&
              cache.enterButton
            ) {
              autoConnect(cache.skipIntroButton, cache.enterButton);
            }
            if (newOptions.skipIntro && cache.skipIntroButton) {
              skipIntro(cache.skipIntroButton);
            }
            if (newOptions.autoConnect && cache.skipIntroButton && cache.enterButton) {
              autoConnect(cache.skipIntroButton, cache.enterButton);
            }
            if (newOptions.isNightMode) applyDarkMode();
            if (!newOptions.isNightMode) removeDarkMode();
          }
        }
      }
    }
  );
}
