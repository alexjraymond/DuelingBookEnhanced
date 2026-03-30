/**
 * Centralized options UI configuration.
 * Single source of truth for option input items used in popup and options pages.
 */

import { OptionsTypes } from "../utilities";

export interface OptionInputItem {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

/**
 * Creates the input items array for options UI.
 * @param options - Current options state
 * @param setOptions - Function to update options state
 * @returns Array of option input items
 */
export function createInputItems(
  options: OptionsTypes,
  setOptions: (options: OptionsTypes) => void
): OptionInputItem[] {
  return [
    {
      id: "allOptions",
      label: "Disable All Options",
      checked: options.disableAllOptions,
      onChange: () => setOptions({ ...options, disableAllOptions: !options.disableAllOptions }),
    },
    {
      id: "disableHotkeys",
      label: "Disable Hotkeys",
      checked: options.disableHotkeys,
      onChange: () => setOptions({ ...options, disableHotkeys: !options.disableHotkeys }),
    },
    {
      id: "skipIntro",
      label: "Skip Intro",
      checked: options.skipIntro,
      onChange: () => setOptions({ ...options, skipIntro: !options.skipIntro }),
    },
    {
      id: "autoConnect",
      label: "Auto-Connect (must be logged in!)",
      checked: options.autoConnect,
      onChange: () => setOptions({ ...options, autoConnect: !options.autoConnect }),
    },
    {
      id: "nightMode",
      label: "Night Mode",
      checked: options.isNightMode,
      onChange: () => setOptions({ ...options, isNightMode: !options.isNightMode }),
    },
  ];
}
