/**
 * Hotkey Handler
 *
 * Handles keyboard event processing and hotkey-to-action mapping.
 */

import { HotkeyEntry } from "../types";
import { ACTION_NAMES } from "../data";
import { getActionsForHotkey } from "../utilities";
import { DOMElementCache } from "./domElementCache";
import { createActionFunctionMap, thumbsUpRelease } from "./actionExecutor";
import { debounce } from "lodash";
import { Logger } from "../services";

const debug = new Logger("hotkeyHandler");

export interface HotkeyHandlerState {
  chatInputFocused: boolean;
  LPInputFocused: boolean;
  getHotkeyHashMap: () => HotkeyEntry[];
  setChatInputFocused: (focused: boolean) => void;
  setLPInputFocused: (focused: boolean) => void;
}

/**
 * Handles keydown events, mapping keys to actions and executing them.
 */
function handleKeyDown(
  e: KeyboardEvent,
  actionFunctionMap: Record<string, () => void>,
  state: HotkeyHandlerState
): void {
  const handler = e.key.toLowerCase();
  if (!(e.target instanceof HTMLInputElement) || handler === "enter") {
    debug.log("Key pressed:", handler);
    const hotkeyHashMap = state.getHotkeyHashMap();
    const actions = getActionsForHotkey(handler, hotkeyHashMap);
    debug.log("actions", actions);
    if (actions.length > 0) {
      actions.forEach((action) => {
        const hotkeyEntry = hotkeyHashMap.find((hk) => hk.action === action);
        if (hotkeyEntry && hotkeyEntry.disabled) {
          debug.log("Hotkey is disabled:", action);
          return;
        }
        if (action in actionFunctionMap) {
          actionFunctionMap[action]();
          debug.log("Action executed:", action);
        } else {
          debug.log("Action function not found for:", action);
        }
      });
    } else {
      debug.log("No matching actions found.");
    }
  }
}

/**
 * Handles keyup events, specifically for thumbs up release.
 */
function handleKeyUp(e: KeyboardEvent, state: HotkeyHandlerState, cache: DOMElementCache): void {
  const handler = e.key.toLowerCase();

  if (
    !(e.target instanceof HTMLInputElement) &&
    cache.chatInput !== document.activeElement &&
    cache.LPInput !== document.activeElement
  ) {
    debug.log(cache.chatInput !== document.activeElement);
    const hotkeyHashMap = state.getHotkeyHashMap();
    const actions = getActionsForHotkey(handler, hotkeyHashMap);
    if (actions.includes(ACTION_NAMES.THUMBS_UP)) {
      thumbsUpRelease(cache);
    }
  }
}

/**
 * Sets up keyboard event listeners for hotkey handling.
 */
export function setupHotkeyListeners(
  cache: DOMElementCache,
  state: HotkeyHandlerState
): () => void {
  const actionFunctionMap = createActionFunctionMap(cache, {
    chatInputFocused: state.chatInputFocused,
    LPInputFocused: state.LPInputFocused,
    setChatInputFocused: state.setChatInputFocused,
    setLPInputFocused: state.setLPInputFocused,
  });

  // Adjust these timers for user responsiveness
  const debouncedKeyDown = debounce(
    (e: KeyboardEvent) => handleKeyDown(e, actionFunctionMap, state),
    150
  );
  const debouncedKeyUp = debounce((e: KeyboardEvent) => handleKeyUp(e, state, cache), 160);

  document.addEventListener("keydown", debouncedKeyDown);
  document.addEventListener("keyup", debouncedKeyUp);

  // Return cleanup function
  return () => {
    document.removeEventListener("keydown", debouncedKeyDown);
    document.removeEventListener("keyup", debouncedKeyUp);
  };
}
