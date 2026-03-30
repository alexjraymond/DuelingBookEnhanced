/**
 * Centralized action name constants.
 * Single source of truth for all hotkey action names used throughout the application.
 */

export const ACTION_NAMES = {
  // Deck Actions
  CLOSE_VIEW_MENU: "Close View Menu",
  VIEW_GRAVEYARD: "View Graveyard",
  VIEW_BANISH: "View Banish",
  VIEW_MAIN_DECK: "View Main Deck",
  VIEW_EXTRA_DECK: "View Extra Deck",
  BANISH_T: "Banish T.",

  // Card Actions
  ACTIVATE: "Activate",
  TO_ST: "To S/T",
  BANISH: "Banish",
  BANISH_FD: "Banish FD",
  DECLARE: "Declare",
  NORMAL_SUMMON: "Normal Summon",
  OVERLAY: "Overlay",
  S_SUMMON_ATK: "S. Summon ATK",
  SS_ATK: "SS ATK",
  OL_ATK: "OL ATK",
  S_SUMMON_DEF: "S. Summon DEF",
  SS_DEF: "SS DEF",
  OL_DEF: "OL DEF",
  SET: "Set",
  DETACH: "Detach",
  TO_GRAVEYARD: "To Graveyard",
  TO_GRAVE: "To Grave",
  TO_BOTTOM_OF_DECK: "To Bottom of Deck",
  TO_B_DECK: "To B. Deck",
  TO_HAND: "To Hand",
  TO_EXTRA_DECK: "To Extra Deck",
  TO_EXTRA_DECK_FU: "To Extra Deck FU",
  TARGET: "Target",

  // Mills
  MILL_1: "Mill 1",
  MILL_2: "Mill 2",
  MILL_3: "Mill 3",
  MILL_4: "Mill 4",
  MILL_5: "Mill 5",
  MILL_6: "Mill 6",

  // LP
  ADD_LP: "Add LP",
  SUB_LP: "Sub LP",

  // Emotes/Chat Box
  TOGGLE_CHAT_BOX: "Toggle Chat Box",
  THINK: "Think",
  THUMBS_UP: "Thumbs Up",
} as const;
