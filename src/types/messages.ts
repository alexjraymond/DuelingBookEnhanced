/**
 * Centralized message type definitions for Chrome extension messaging.
 * Provides type-safe message passing between content scripts, popup, options page, and background.
 */

/**
 * Message types used for Chrome runtime messaging.
 */
export enum MessageType {
  HOTKEYS_CHANGED = "HOTKEYS_CHANGED",
  SETTINGS_CHANGED = "SETTINGS_CHANGED",
}

/**
 * Payload for HOTKEYS_CHANGED message.
 */
export interface HotkeysChangedPayload {
  type: MessageType.HOTKEYS_CHANGED;
  payload: unknown; // HotkeyEntry[] - using unknown to avoid circular dependency
}

/**
 * Payload for SETTINGS_CHANGED message.
 */
export interface SettingsChangedPayload {
  type: MessageType.SETTINGS_CHANGED;
  payload: unknown; // OptionsTypes - using unknown to avoid circular dependency
}

/**
 * Union type of all possible message payloads.
 */
export type MessagePayload = HotkeysChangedPayload | SettingsChangedPayload;
