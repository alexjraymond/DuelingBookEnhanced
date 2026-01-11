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

export const getOptionsFromStorage = async (): Promise<OptionsTypes> => {
  return await getStorage<OptionsTypes>("options", DEFAULT_OPTIONS);
};

export const saveOptionsToStorage = async (options: OptionsTypes): Promise<void> => {
  await setStorage("options", options);
  // notify content scripts that settings have changed
  await sendMessageToAllTabs({
    type: MessageType.SETTINGS_CHANGED,
    payload: options,
  });
};

export function skipIntro(skipIntroButton: HTMLElement) {
  if (skipIntroButton.style.display !== "none") {
    debug.log("Intro is visible, skipping...");
    skipIntroButton.click();
  }
}

export function autoConnect(skipIntroButton: HTMLElement, enterButton: HTMLElement) {
  // Create a MutationObserver to wait for skipIntroButton to become hidden
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

  // Start observing the skipIntroButton
  observer.observe(skipIntroButton, { attributes: true, attributeOldValue: true });
}
