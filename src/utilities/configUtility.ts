import { HotkeyEntry, MessageType } from "../types";
import { ACTION_NAMES } from "../data";
import { getStorage, setStorage, sendMessageToAllTabs } from "../services";

/**
 * Loads hotkey configuration from Chrome storage.
 * Returns stored hotkeys if available, otherwise returns default hotkeys.
 *
 * @returns Promise that resolves to an array of hotkey entries
 */
export async function loadHotkeysConfig(): Promise<HotkeyEntry[]> {
  const storedHotkeys = await getStorage<HotkeyEntry[]>("hotkeysConfig", []);
  return storedHotkeys.length > 0 ? storedHotkeys : getDefaultHotkeys();
}

/**
 * Saves hotkey configuration to Chrome storage and notifies all content scripts.
 * Sends a HOTKEYS_CHANGED message to all tabs to update active content scripts.
 *
 * @param hotkeys - Array of hotkey entries to save
 * @returns Promise that resolves when the save and notification are complete
 */
export async function saveHotkeysConfig(hotkeys: HotkeyEntry[]): Promise<void> {
  await setStorage("hotkeysConfig", hotkeys);
  await sendMessageToAllTabs({
    type: MessageType.HOTKEYS_CHANGED,
    payload: hotkeys,
  });
}

/**
 * Returns the default hotkey configuration.
 * Each entry maps an action name to a keyboard key and includes a disabled flag.
 *
 * @returns Array of default hotkey entries with predefined key mappings
 */
export function getDefaultHotkeys(): HotkeyEntry[] {
  return [
    { action: ACTION_NAMES.CLOSE_VIEW_MENU, hotkey: "escape", disabled: false },
    { action: ACTION_NAMES.VIEW_GRAVEYARD, hotkey: "g", disabled: false },
    { action: ACTION_NAMES.VIEW_BANISH, hotkey: ",", disabled: false },
    { action: ACTION_NAMES.VIEW_MAIN_DECK, hotkey: "v", disabled: false },
    { action: ACTION_NAMES.BANISH_T, hotkey: "m", disabled: false },
    { action: ACTION_NAMES.VIEW_EXTRA_DECK, hotkey: "e", disabled: false },
    { action: ACTION_NAMES.THINK, hotkey: "t", disabled: false },
    { action: ACTION_NAMES.THUMBS_UP, hotkey: "f", disabled: false },
    { action: ACTION_NAMES.TOGGLE_CHAT_BOX, hotkey: "enter", disabled: false },
    { action: ACTION_NAMES.DECLARE, hotkey: "d", disabled: false },
    { action: ACTION_NAMES.TO_HAND, hotkey: "h", disabled: false },
    { action: ACTION_NAMES.TO_EXTRA_DECK, hotkey: "h", disabled: false },
    { action: ACTION_NAMES.TO_EXTRA_DECK_FU, hotkey: "u", disabled: false },
    { action: ACTION_NAMES.ACTIVATE, hotkey: "a", disabled: false },
    { action: ACTION_NAMES.TO_ST, hotkey: "a", disabled: false },
    { action: ACTION_NAMES.OVERLAY, hotkey: "o", disabled: false },
    { action: ACTION_NAMES.S_SUMMON_ATK, hotkey: "s", disabled: false },
    { action: ACTION_NAMES.SS_ATK, hotkey: "s", disabled: false },
    { action: ACTION_NAMES.OL_ATK, hotkey: "i", disabled: false },
    { action: ACTION_NAMES.S_SUMMON_DEF, hotkey: "x", disabled: false },
    { action: ACTION_NAMES.SS_DEF, hotkey: "x", disabled: false },
    { action: ACTION_NAMES.OL_DEF, hotkey: "p", disabled: false },
    { action: ACTION_NAMES.NORMAL_SUMMON, hotkey: "n", disabled: false },
    { action: ACTION_NAMES.SET, hotkey: "j", disabled: false },
    { action: ACTION_NAMES.DETACH, hotkey: "q", disabled: false },
    { action: ACTION_NAMES.TO_GRAVEYARD, hotkey: "q", disabled: false },
    { action: ACTION_NAMES.TO_GRAVE, hotkey: "q", disabled: false },
    { action: ACTION_NAMES.BANISH, hotkey: "w", disabled: false },
    { action: ACTION_NAMES.BANISH_FD, hotkey: "b", disabled: false },
    { action: ACTION_NAMES.TO_BOTTOM_OF_DECK, hotkey: "z", disabled: false },
    { action: ACTION_NAMES.TO_B_DECK, hotkey: "z", disabled: false },
    { action: ACTION_NAMES.MILL_1, hotkey: "1", disabled: false },
    { action: ACTION_NAMES.MILL_2, hotkey: "2", disabled: false },
    { action: ACTION_NAMES.MILL_3, hotkey: "3", disabled: false },
    { action: ACTION_NAMES.MILL_4, hotkey: "4", disabled: false },
    { action: ACTION_NAMES.MILL_5, hotkey: "5", disabled: false },
    { action: ACTION_NAMES.MILL_6, hotkey: "6", disabled: false },
    { action: ACTION_NAMES.SUB_LP, hotkey: "-", disabled: false },
    { action: ACTION_NAMES.ADD_LP, hotkey: "+", disabled: false },
    { action: ACTION_NAMES.TARGET, hotkey: "r", disabled: false },
  ];
}

/**
 * Finds all actions that are mapped to a specific hotkey.
 * Since multiple actions can share the same hotkey, this returns an array of action names.
 *
 * @param hotkey - The keyboard key to search for (e.g., "g", "escape")
 * @param hotkeyMap - Array of hotkey entries to search through
 * @returns Array of action names that are mapped to the given hotkey
 */
export function getActionsForHotkey(hotkey: string, hotkeyMap: HotkeyEntry[]): string[] {
  const matchingActions: string[] = [];

  for (const entry of hotkeyMap) {
    if (entry.hotkey === hotkey) {
      matchingActions.push(entry.action);
    }
  }
  return matchingActions;
}
