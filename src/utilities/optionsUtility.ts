/**
 * Options configuration interface.
 * Defines all available extension settings that can be toggled.
 */
export interface OptionsTypes {
  disableAllOptions: boolean;
  disableHotkeys: boolean;
  skipIntro: boolean;
  autoConnect: boolean;
  isNightMode: boolean;
}

import { MessageType } from "../types";
import { DEFAULT_OPTIONS } from "../data";
import { getStorage, setStorage, sendMessageToAllTabs, Logger } from "../services";

const debug = new Logger("optionsUtility");

/**
 * Loads options from Chrome storage.
 * Returns stored options if available, otherwise returns default options.
 *
 * @returns Promise that resolves to the options configuration
 */
export const getOptionsFromStorage = async (): Promise<OptionsTypes> => {
  return await getStorage<OptionsTypes>("options", DEFAULT_OPTIONS);
};

/**
 * Saves options to Chrome storage and notifies all content scripts.
 * Sends a SETTINGS_CHANGED message to all tabs to update active content scripts.
 *
 * @param options - Options configuration to save
 * @returns Promise that resolves when the save and notification are complete
 */
export const saveOptionsToStorage = async (options: OptionsTypes): Promise<void> => {
  await setStorage("options", options);
  await sendMessageToAllTabs({
    type: MessageType.SETTINGS_CHANGED,
    payload: options,
  });
};

/**
 * Clicks the skip intro button if it is visible.
 * Used to automatically skip the DuelingBook intro screen.
 *
 * @param skipIntroButton - The skip intro button DOM element
 */
export function skipIntro(skipIntroButton: HTMLElement) {
  if (skipIntroButton.style.display !== "none") {
    debug.log("Intro is visible, skipping...");
    skipIntroButton.click();
  }
}

/**
 * Automatically connects to a duel after the intro is skipped.
 * Uses a MutationObserver to watch for when the skip intro button becomes hidden,
 * then clicks the enter button to start the duel.
 * Returns a cleanup function to manually disconnect the observer if needed.
 *
 * @param skipIntroButton - The skip intro button DOM element to observe
 * @param enterButton - The enter/duel button DOM element to click
 * @returns Cleanup function that disconnects the observer
 */
export function autoConnect(skipIntroButton: HTMLElement, enterButton: HTMLElement): () => void {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === "style") {
        const newStyle = (mutation.target as HTMLElement).style.display;
        const oldStyle = mutation.oldValue;
        if (newStyle === "none" && oldStyle !== "none") {
          enterButton.click();
          // Disconnect the observer since we only need to trigger this once
          observer.disconnect();
          break;
        }
      }
    }
  });

  observer.observe(skipIntroButton, { attributes: true, attributeOldValue: true });

  // Return cleanup function for manual disconnection if needed
  return () => observer.disconnect();
}
