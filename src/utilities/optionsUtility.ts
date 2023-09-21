export interface OptionsTypes {
  disableAllOptions: boolean;
  skipIntro: boolean;
  autoConnect: boolean;
  isNightMode: boolean;
}

export const getOptionsFromStorage = (callback: (options: OptionsTypes) => void) => {
  chrome.storage.sync.get(["options"], (result) => {
    const options = result.options || {
      disableAllOptions: false,
      skipIntro: false,
      autoConnect: false,
      isNightMode: false,
    };
    callback(options);
  });
};

export const saveOptionsToStorage = (options: OptionsTypes) => {
  chrome.storage.sync.set({ options });
};

export function skipIntro(skipIntroButton: HTMLElement) {
  if (skipIntroButton.style.display !== 'none') {
    console.log('Intro is visible, skipping...');
    skipIntroButton.click();
  }
}

export function autoConnect(skipIntroButton: HTMLElement, enterButton: HTMLElement) {
  // Create a MutationObserver to wait for skipIntroButton to become hidden
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'style') {
        const newStyle = (mutation.target as HTMLElement).style.display;
        const oldStyle = mutation.oldValue;
        if (newStyle === 'none' && oldStyle !== 'none') {
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
