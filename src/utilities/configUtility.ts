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
    { action: "Banish", hotkey: "w" }
  ];
}

export function getActionsForHotkey(hotkey: string): string[] {
  const hotkeyMap = getDefaultHotkeys();
  const matchingActions: string[] = [];

  for (const entry of hotkeyMap) {
    if (entry.hotkey === hotkey) {
      matchingActions.push(entry.action);
    }
  }
  return matchingActions;
}
