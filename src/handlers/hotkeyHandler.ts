/**
 * Hotkey Handler
 *
 * Handles keyboard event processing and hotkey-to-action mapping.
 */

import { HotkeyEntry } from "../types";
import { ACTION_NAMES, DEBOUNCE_DELAYS } from "../data";
import { getActionsForHotkey } from "../utilities";
import { DOMElementCache } from "./domElementCache";
import { createActionFunctionMap, thumbsUpRelease } from "./actionExecutor";
import { debounce } from "lodash";
import { Logger } from "../services";

const debug = new Logger("hotkeyHandler");

/**
 * State interface for the hotkey handler.
 * Manages focus states and provides access to the hotkey configuration map.
 */
export interface HotkeyHandlerState {
  /** Whether the chat input field is currently focused */
  chatInputFocused: boolean;
  /** Whether the LP input field is currently focused */
  LPInputFocused: boolean;
  /** Function to get the current hotkey configuration map */
  getHotkeyHashMap: () => HotkeyEntry[];
  /** Function to set the chat input focus state */
  setChatInputFocused: (focused: boolean) => void;
  /** Function to set the LP input focus state */
  setLPInputFocused: (focused: boolean) => void;
}

/**
 * Handles keydown events, mapping keys to actions and executing them.
 * Ignores key presses when typing in input fields (except Enter key).
 * Checks if the pressed key matches any configured hotkeys and executes the corresponding actions.
 * Skips disabled hotkeys.
 *
 * @param e - Keyboard event from the keydown listener
 * @param actionFunctionMap - Map of action names to their execution functions
 * @param state - Hotkey handler state containing hotkey map and focus states
 */
function handleKeyDown(
  e: KeyboardEvent,
  actionFunctionMap: Record<string, () => void>,
  state: HotkeyHandlerState
): void {
  const handler = e.key.toLowerCase();
  // Allow Enter key to work even in input fields (for chat toggle)
  if (!(e.target instanceof HTMLInputElement) || handler === "enter") {
    debug.log("Key pressed:", handler);
    const hotkeyHashMap = state.getHotkeyHashMap();
    const actions = getActionsForHotkey(handler, hotkeyHashMap);
    debug.log("actions", actions);
    if (actions.length > 0) {
      // Create action-to-entry map for O(1) lookups instead of O(n²) with Array.find()
      const actionMap = new Map(hotkeyHashMap.map((entry) => [entry.action, entry]));

      actions.forEach((action) => {
        const hotkeyEntry = actionMap.get(action);
        if (hotkeyEntry?.disabled) {
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
 * Only processes keyup events when not typing in input fields.
 * Checks if the released key was mapped to the thumbs up action and releases the button.
 *
 * @param e - Keyboard event from the keyup listener
 * @param state - Hotkey handler state containing hotkey map and focus states
 * @param cache - DOM element cache containing game UI elements
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
 * Creates debounced event handlers to prevent rapid repeated execution.
 * Returns a cleanup function to remove the event listeners.
 *
 * @param cache - DOM element cache containing game UI elements
 * @param state - Hotkey handler state containing hotkey map and focus states
 * @returns Cleanup function that removes the event listeners
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

  // Debounce timers prevent rapid repeated execution
  const debouncedKeyDown = debounce(
    (e: KeyboardEvent) => handleKeyDown(e, actionFunctionMap, state),
    DEBOUNCE_DELAYS.KEYDOWN
  );
  const debouncedKeyUp = debounce(
    (e: KeyboardEvent) => handleKeyUp(e, state, cache),
    DEBOUNCE_DELAYS.KEYUP
  );

  document.addEventListener("keydown", debouncedKeyDown);
  document.addEventListener("keyup", debouncedKeyUp);

  return () => {
    document.removeEventListener("keydown", debouncedKeyDown);
    document.removeEventListener("keyup", debouncedKeyUp);
  };
}
