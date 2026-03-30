/**
 * DOM Element Cache
 *
 * Centralizes DOM element caching and initialization for the content script.
 * Provides a single source of truth for all cached DOM elements.
 */

import { EDOMElements } from "../data";

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
  const viewElement = document.getElementById(EDOMElements.View);
  const cardMenuContent = document.getElementById(EDOMElements.CardMenuContent);
  const chatInputs = document.querySelectorAll(EDOMElements.ChatInput);

  return {
    view: viewElement,
    closeViewButton:
      (viewElement?.getElementsByClassName(EDOMElements.ExitButton)[0] as HTMLElement | null) ||
      null,
    deck: document.getElementById(EDOMElements.DeckHidden),
    extraDeck: document.getElementById(EDOMElements.ExtraDeckHidden),
    deckMenu: cardMenuContent,
    deckViewButton:
      (cardMenuContent?.getElementsByClassName(
        EDOMElements.CardMenuButton
      )[0] as HTMLElement | null) || null,
    deckViewSpan:
      (cardMenuContent
        ?.getElementsByClassName(EDOMElements.CardMenuButton)[0]
        ?.getElementsByTagName("span")[0] as HTMLElement | null) || null,
    deckBanishButton: null,
    deckBanishSpan: null,
    LPInput: document.getElementById(EDOMElements.LifePointsInput),
    subButton: document.getElementById(EDOMElements.SubtractButton),
    addButton: document.getElementById(EDOMElements.AddButton),
    // Second input with class 'cin_txt' is the chat input (first is likely LP input or another field)
    chatInput: (chatInputs[1] as HTMLInputElement | undefined) || null,
    thunk: document.getElementById(EDOMElements.ThinkButton),
    thumbsUp: document.getElementById(EDOMElements.ThumbsUpButton),
    graveyard: document.getElementById(EDOMElements.GraveyardHidden),
    banished: document.getElementById(EDOMElements.BanishedHidden),
    skipIntroButton: document.getElementById(EDOMElements.SkipIntroButton),
    enterButton: document.getElementById(EDOMElements.DuelButton),
  };
}
