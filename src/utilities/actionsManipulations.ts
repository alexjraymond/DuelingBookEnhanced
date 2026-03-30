/**
 * Splits an action string by "/" delimiter if present, otherwise returns it as a single-item array.
 * Used to handle actions that can be represented as multiple options (e.g., "TO_GRAVE/TO_GRAVEYARD").
 *
 * @param action - The action string to split (may contain "/" delimiter)
 * @returns Array of action strings, or a single-item array if no delimiter is present
 *
 * @example
 * splitActions("TO_GRAVE") // Returns ["TO_GRAVE"]
 * splitActions("TO_GRAVE/TO_GRAVEYARD") // Returns ["TO_GRAVE", "TO_GRAVEYARD"]
 */
export function splitActions(action: string) {
  return action.includes("/") ? action.split("/") : [action];
}
