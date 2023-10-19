export interface HotkeyEntry {
  action: string;
  hotkey: string;
}

export async function loadHotkeysConfig(): Promise<HotkeyEntry[]> {
  return new Promise<HotkeyEntry[]>((resolve) => {
    chrome.storage.sync.get({ hotkeysConfig: [] }, (data) => {
      const hotkeys = data.hotkeysConfig.length > 0 ? data.hotkeysConfig : getDefaultHotkeys();
      resolve(hotkeys);
    });
  });
}

export async function saveHotkeysConfig(hotkeys: HotkeyEntry[]): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set({ hotkeysConfig: hotkeys }, () => {
      resolve();
    });
  });
}

// don't forget to update the actionsFunctionMap in content_script.tsx
// each object needs a prop called disable, auto set to false
export function getDefaultHotkeys(): HotkeyEntry[] {
  return [
    { action: "Close View Menu", hotkey: "escape" },
    { action: "View Graveyard", hotkey: "g" },
    { action: "View Main Deck", hotkey: "v" },
    { action: "View Extra Deck", hotkey: "e" },
    { action: "Think", hotkey: "t" },
    { action: "Thumbs Up", hotkey: "f" },
    { action: "Toggle Chat Box", hotkey: "enter" },
    { action: "Declare", hotkey: "d" },
    { action: "To Hand", hotkey: "h" },
    { action: "Activate", hotkey: "a" },
    { action: "To S/T", hotkey: "a" },
    { action: "S. Summon ATK", hotkey: "s" },
    { action: "SS ATK", hotkey: "s" },
    { action: "Normal Summon", hotkey: "n" },
    { action: "Set", hotkey: "j" },
    { action: "To Graveyard", hotkey: "q" },
    { action: "To Grave", hotkey: "q" },
    { action: "Banish", hotkey: "w" },
    { action: "Banish FD", hotkey: "b" },
    { action: "To Bottom of Deck", hotkey: "z"},
    { action: "To B. Deck", hotkey: "z"},
    { action: "Mill 1", hotkey: "1"},
    { action: "Mill 2", hotkey: "2"},
    { action: "Mill 3", hotkey: "3"},
    { action: "Mill 4", hotkey: "4"},
    { action: "Mill 5", hotkey: "5"},
    { action: "Mill 6", hotkey: "6"},
    
  ];
}


export function getActionsForHotkey(hotkey: string, hotkeyMap: HotkeyEntry[]): string[] {
  const matchingActions: string[] = [];

  for (const entry of hotkeyMap) {
    if (entry.hotkey === hotkey) {
      matchingActions.push(entry.action);
    }
  }
  return matchingActions;
}
