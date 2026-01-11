/**
 * DOM Element Cache
 *
 * Centralizes DOM element caching and initialization for the content script.
 * Provides a single source of truth for all cached DOM elements.
 */

export interface DOMElementCache {
  view: HTMLElement | null;
  closeViewButton: HTMLElement | null;
  deck: HTMLElement | null;
  extraDeck: HTMLElement | null;
  deckMenu: HTMLElement | null;
  deckViewButton: HTMLElement | null;
  deckViewSpan: HTMLElement | null;
  deckBanishButton: HTMLElement | null;
  deckBanishSpan: HTMLElement | null;
  LPInput: HTMLElement | null;
  subButton: HTMLElement | null;
  addButton: HTMLElement | null;
  chatInput: HTMLInputElement | null;
  thunk: HTMLElement | null;
  thumbsUp: HTMLElement | null;
  graveyard: HTMLElement | null;
  banished: HTMLElement | null;
  skipIntroButton: HTMLElement | null;
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
    chatInput: document.querySelectorAll("input.cin_txt")[1] as HTMLInputElement,
    thunk: document.getElementById("think_btn"),
    thumbsUp: document.getElementById("good_btn"),
    graveyard: document.getElementById("grave_hidden"),
    banished: document.getElementById("banished_hidden"),
    skipIntroButton: document.getElementById("skip_intro_btn") as HTMLElement,
    enterButton: document.getElementById("duel_btn") as HTMLElement,
  };
}
