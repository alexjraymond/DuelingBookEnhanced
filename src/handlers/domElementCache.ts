/**
 * DOM Element Cache
 *
 * Centralizes DOM element caching and initialization for the content script.
 * Provides a single source of truth for all cached DOM elements.
 */

/**
 * Cache of DOM elements used by the content script.
 * Centralizes all DOM queries for better performance and maintainability.
 * All elements are nullable as they may not exist on all pages.
 */
export interface DOMElementCache {
  /** Main view container element */
  view: HTMLElement | null;
  /** Close button in the view menu */
  closeViewButton: HTMLElement | null;
  /** Main deck element */
  deck: HTMLElement | null;
  /** Extra deck element */
  extraDeck: HTMLElement | null;
  /** Deck menu container */
  deckMenu: HTMLElement | null;
  /** Deck view button in the menu */
  deckViewButton: HTMLElement | null;
  /** Deck view button span element */
  deckViewSpan: HTMLElement | null;
  /** Deck banish button (set dynamically when needed) */
  deckBanishButton: HTMLElement | null;
  /** Deck banish button span (set dynamically when needed) */
  deckBanishSpan: HTMLElement | null;
  /** Life Points input field */
  LPInput: HTMLElement | null;
  /** Subtract LP button */
  subButton: HTMLElement | null;
  /** Add LP button */
  addButton: HTMLElement | null;
  /** Chat input field (second input with class 'cin_txt') */
  chatInput: HTMLInputElement | null;
  /** Think button */
  thunk: HTMLElement | null;
  /** Thumbs up button */
  thumbsUp: HTMLElement | null;
  /** Graveyard element */
  graveyard: HTMLElement | null;
  /** Banished zone element */
  banished: HTMLElement | null;
  /** Skip intro button */
  skipIntroButton: HTMLElement | null;
  /** Enter/start duel button */
  enterButton: HTMLElement | null;
}

/**
 * Initializes and caches all DOM elements used by the content script.
 * Should be called after window.onload to ensure DOM is ready.
 */
export function initializeDOMCache(): DOMElementCache {
  return {
    view: document.getElementById("view") as HTMLElement,
    closeViewButton: document
      .getElementById("view")
      ?.getElementsByClassName("exit_btn")[0] as HTMLElement,
    deck: document.getElementById("deck_hidden") as HTMLElement,
    extraDeck: document.getElementById("extra_hidden") as HTMLElement,
    deckMenu: document.getElementById("card_menu_content") as HTMLElement,
    deckViewButton: document
      .getElementById("card_menu_content")
      ?.getElementsByClassName("card_menu_btn")[0] as HTMLElement,
    deckViewSpan: document
      .getElementById("card_menu_content")
      ?.getElementsByClassName("card_menu_btn")[0]
      ?.getElementsByTagName("span")[0] as HTMLElement,
    deckBanishButton: null, // Set dynamically when needed
    deckBanishSpan: null, // Set dynamically when needed
    LPInput: document.getElementById("life_txt") as HTMLElement,
    subButton: document.getElementById("plus_btn") as HTMLElement,
    addButton: document.getElementById("minus_btn") as HTMLElement,
    // Second input with class 'cin_txt' is the chat input (first is likely LP input or another field)
    chatInput: document.querySelectorAll("input.cin_txt")[1] as HTMLInputElement,
    thunk: document.getElementById("think_btn"),
    thumbsUp: document.getElementById("good_btn"),
    graveyard: document.getElementById("grave_hidden"),
    banished: document.getElementById("banished_hidden"),
    skipIntroButton: document.getElementById("skip_intro_btn") as HTMLElement,
    enterButton: document.getElementById("duel_btn") as HTMLElement,
  };
}
