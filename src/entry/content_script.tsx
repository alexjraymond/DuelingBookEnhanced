/**
 * Content Script Entry Point
 *
 * Orchestrates all content script handlers for hotkey management,
 * options handling, and action execution.
 */

import { MessageType } from "../types";
import { HotkeyEntry } from "../types";
import { Logger } from "../services";
import {
  initializeDOMCache,
  initializeOptions,
  setupOptionsChangeListener,
  setupHotkeyListeners,
  OptionsManagerCallbacks,
  HotkeyHandlerState,
} from "../handlers";

const debug = new Logger("content_script");

window.onload = async function () {
  // Initialize DOM element cache
  const cache = initializeDOMCache();

  // State management
  let hotkeyHashMap: HotkeyEntry[] = [];
  let chatInputFocused = false;
  let LPInputFocused = false;

  // State setters
  const setChatInputFocused = (focused: boolean) => {
    chatInputFocused = focused;
  };
  const setLPInputFocused = (focused: boolean) => {
    LPInputFocused = focused;
  };

  // Options manager callbacks
  const optionsCallbacks: OptionsManagerCallbacks = {
    onHotkeysLoaded: (hotkeys: HotkeyEntry[]) => {
      hotkeyHashMap = hotkeys;
      debug.log("Loaded hotkeys configuration:", hotkeyHashMap);
    },
    onHotkeysCleared: () => {
      hotkeyHashMap = [];
    },
  };

  // Initialize options and load hotkeys
  await initializeOptions(cache, optionsCallbacks);

  // Set up options change listener
  setupOptionsChangeListener(cache, optionsCallbacks);

  // Set up Chrome runtime message listener for hotkey updates
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MessageType.HOTKEYS_CHANGED) {
      debug.log("Received updated hotkeys:", message.payload);
      hotkeyHashMap = message.payload as HotkeyEntry[];
      return true;
    }
  });

  // Hotkey handler state
  const hotkeyState: HotkeyHandlerState = {
    chatInputFocused,
    LPInputFocused,
    getHotkeyHashMap: () => hotkeyHashMap,
    setChatInputFocused,
    setLPInputFocused,
  };

  // Set up hotkey listeners
  setupHotkeyListeners(cache, hotkeyState);
};
