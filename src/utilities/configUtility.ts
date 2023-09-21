type HotkeyMap = {
  [key: string]: { action: string };
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
      "action": "To Graveyard"
    },
    "h": {
      "action": "To Hand"
    },
    "a": {
      "action": "Activate"
    },
    "s": {
      "action": "S. Summon ATK"
    },
    "n": {
      "action": "Normal Summon"
    },
    "j": {
      "action": "Set"
    }
  };
}
