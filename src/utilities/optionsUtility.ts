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
