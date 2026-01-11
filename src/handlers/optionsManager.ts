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

export interface OptionsManagerCallbacks {
  onHotkeysLoaded: (hotkeys: HotkeyEntry[]) => void;
  onHotkeysCleared: () => void;
}

/**
 * Initializes options from Chrome storage and sets up change listeners.
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
        // set all options to false, ensure dark mode is off, and don't run other functions
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

        if (options && options.skipIntro && options.autoConnect)
          autoConnect(cache.skipIntroButton!, cache.enterButton!);
        if (options && options.skipIntro) skipIntro(cache.skipIntroButton!);
        if (options && options.autoConnect) autoConnect(cache.skipIntroButton!, cache.enterButton!);
        if (options && options.isNightMode) applyDarkMode();
        if (options && !options.isNightMode) removeDarkMode();
      }

      resolve(options);
    });
  });
}

/**
 * Sets up Chrome storage change listener to handle options updates.
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
            // set all options to false, ensure dark mode is off, and don't run other functions
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
            if (newOptions.skipIntro && newOptions.autoConnect)
              autoConnect(cache.skipIntroButton!, cache.enterButton!);
            if (newOptions.skipIntro) skipIntro(cache.skipIntroButton!);
            if (newOptions.autoConnect) autoConnect(cache.skipIntroButton!, cache.enterButton!);
            if (newOptions.isNightMode) applyDarkMode();
            if (!newOptions.isNightMode) removeDarkMode();
          }
        }
      }
    }
  );
}
