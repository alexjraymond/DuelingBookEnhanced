/**
 * Centralized default options configuration.
 * Single source of truth for default option values used throughout the application.
 */

import { OptionsTypes } from "../utilities";

/**
 * Default options object used when no options are stored or as initial state.
 */
export const DEFAULT_OPTIONS: OptionsTypes = {
  disableAllOptions: false,
  disableHotkeys: false,
  skipIntro: false,
  autoConnect: false,
  isNightMode: false,
};
