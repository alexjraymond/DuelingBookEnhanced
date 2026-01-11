/**
 * Version update features for the "What's New" page.
 * Update this file with new features for each version release.
 */

export interface UpdateFeature {
  feature: string;
}

export const UPDATE_FEATURES: UpdateFeature[] = [
  {
    feature: '"To Extra Deck" and "To Hand" now share a hotkey ',
  },
  {
    feature: 'Added hotkey for "To Extra Deck FU" (Default "u") ',
  },
  {
    feature: 'Added hotkey for Banishing Top of Deck (no need to hover) (Default "m") ',
  },
  {
    feature: 'Added hotkey for Target (Default "r") ',
  },
  {
    feature: "Removed various buggy hotkeys such as tab, shift, ctrl, arrow keys, etc ",
  },
  {
    feature: "This page that you are now seeing! ",
  },
];
