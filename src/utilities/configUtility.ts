type HotkeyMap = {
  [key: string]: { action: string | [string, string] };
};

export async function loadHotkeysConfig(): Promise<HotkeyMap> {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ hotkeysConfig: {} }, (data) => {
      const hotkeys = data.hotkeysConfig.hotkeys || getDefaultHotkeys();
      resolve(hotkeys);
    });
  });
}

export async function saveHotkeysConfig(hotkeys: HotkeyMap): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set({ hotkeysConfig: hotkeys }, () => {
      resolve();
    });
  });
}

// don't forget to update the actionsFunctionMap in content_script.tsx
export function getDefaultHotkeys(): HotkeyMap {
  return {
    "escape": {
      "action": "Close View Menu"
    },
    "g": {
      "action": "View Graveyard"
    },
    "v": {
      "action": "View Main Deck"
    },
    "e": {
      "action": "View Extra Deck"
    },
    "t": {
      "action": "Think"
    },
    "f": {
      "action": "Thumbs Up"
    },
    "enter": {
      "action": "Toggle Chat Box"
    },
    "d": {
      "action": "Declare"
    },
    "h": {
      "action": "To Hand"
    },
    "a": {
      "action": ["Activate", "To S/T"]
    },
    "s": {
      "action": ["S. Summon ATK", "SS ATK"]
    },
    "n": {
      "action": "Normal Summon"
    },
    "j": {
      "action": "Set"
    },
    "q": {
      "action": ["To Graveyard", "To Grave"]
    },
    "w": {
      "action": "Banish"
    }
  };
}
