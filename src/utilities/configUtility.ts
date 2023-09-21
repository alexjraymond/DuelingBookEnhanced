type HotkeyMap = {
  [key: string]: { div: string | null; name: string };
};

export async function loadHotkeysConfig(): Promise<HotkeyMap> {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ hotkeysConfig: {} }, (data) => {
      const hotkeys = data.hotkeysConfig.hotkeys || getDefaultHotkeys();
      resolve(hotkeys);
    });
  });
}

function getDefaultHotkeys(): HotkeyMap {
  return {
    "escape": {
      "div": null,
      "name": "view menu"
    },
    "g": {
      "div": "gY",
      "name": "GY"
    },
  };
}
