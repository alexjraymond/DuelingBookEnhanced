/**
 * Application Constants
 *
 * Centralized constants for timeouts, delays, and other magic numbers.
 */

/**
 * Debounce delays (in milliseconds) for keyboard event handling.
 * These values prevent rapid repeated execution of hotkey actions.
 */
export const DEBOUNCE_DELAYS = {
  /** Keydown debounce delay - provides good responsiveness without excessive firing */
  KEYDOWN: 150,
  /** Keyup debounce delay - slightly longer to allow keydown events to process first */
  KEYUP: 160,
} as const;

/**
 * Timeout delays (in milliseconds) for various UI operations.
 */
export const TIMEOUTS = {
  /** Small delay to ensure chat input is focused before dispatching Enter event */
  CHAT_FOCUS: 10,
} as const;
