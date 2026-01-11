/**
 * Represents a single hotkey configuration entry.
 *
 * @property action - The action name that the hotkey triggers (e.g., "View Graveyard", "To Hand")
 * @property hotkey - The keyboard key that triggers this action (e.g., "g", "escape")
 * @property disabled - Whether this hotkey is currently disabled
 */
export interface HotkeyEntry {
  action: string;
  hotkey: string;
  disabled: boolean;
}
