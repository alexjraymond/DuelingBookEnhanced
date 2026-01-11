/**
 * Action Executor
 *
 * Handles execution of all game actions (card movements, UI interactions, etc.)
 */

import { ACTION_NAMES } from "../data";
import { DOMElementCache } from "./domElementCache";
import { Logger } from "../services";

const debug = new Logger("actionExecutor");

/**
 * Closes the view menu by clicking the close button.
 */
export function closeViewMenu(cache: DOMElementCache): void {
  cache.closeViewButton?.click();
}

/**
 * Handles deck view actions for Main or Extra deck.
 * Simulates a mouseover event on the deck element to trigger the deck menu,
 * then searches for and clicks the "View" or "Show" button in the menu.
 * If neither is found, closes the view menu.
 *
 * @param deckType - Type of deck to view ("Main" or "Extra")
 * @param cache - DOM element cache containing deck elements
 */
export function handleDeckView(deckType: string, cache: DOMElementCache): void {
  const mouseOverEvent = new MouseEvent("mouseover", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === "Main") {
    cache.deck?.dispatchEvent(mouseOverEvent);
  } else if (deckType === "Extra") {
    cache.extraDeck?.dispatchEvent(mouseOverEvent);
  }

  const deckMenu = document.getElementById("card_menu_content") as HTMLElement;
  let deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[0] as HTMLElement;
  let deckViewSpan = deckViewButton?.getElementsByTagName("span")[0] as HTMLElement;

  if (deckViewSpan && deckViewSpan.textContent === "View") {
    deckViewSpan.click();
  } else if (deckViewSpan && deckViewSpan.textContent === "Show") {
    deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[1] as HTMLElement;
    deckViewSpan = deckViewButton?.getElementsByTagName("span")[0] as HTMLElement;
    deckViewSpan.click();
  } else {
    closeViewMenu(cache);
  }
}

/**
 * Handles deck options actions like banishing cards from the deck.
 * Simulates a mouseover event on the deck element to trigger the deck menu,
 * then finds and clicks the appropriate action button (currently supports "banish").
 *
 * @param deckType - Type of deck ("Main" or "Extra") - currently only "Main" is used
 * @param action - Action to perform (e.g., "banish")
 * @param cache - DOM element cache containing deck elements
 */
export function handleDeckOptions(deckType: string, action: string, cache: DOMElementCache): void {
  const mouseOverEvent = new MouseEvent("mouseover", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === "Main") {
    cache.deck?.dispatchEvent(mouseOverEvent);
  }

  const deckMenu = document.getElementById("card_menu_content") as HTMLElement;

  if (action === "banish") {
    const deckBanishButton = deckMenu?.getElementsByClassName("card_menu_btn")[2] as HTMLElement;
    const deckBanishSpan = deckBanishButton?.getElementsByTagName("span")[0] as HTMLElement;
    debug.log("banish button", deckBanishButton);
    debug.log("banish span", deckBanishSpan);
    deckBanishSpan.click();
  }
}

/**
 * Sends a message to the chat input by setting the value and simulating an Enter key press.
 * Focuses the chat input, sets the message text, then dispatches a keyboard event after a short delay.
 *
 * @param message - The message text to send to chat
 * @param cache - DOM element cache containing the chat input element
 */
export function saySomething(message: string, cache: DOMElementCache): void {
  if (!cache.chatInput) return;

  cache.chatInput.value = message;
  const enterEvent = new KeyboardEvent("keydown", {
    key: "Enter",
    keyCode: 13,
    which: 13,
    bubbles: true,
  });

  cache.chatInput?.focus();
  // Small delay ensures the input is focused before dispatching the Enter event
  setTimeout(() => {
    cache.chatInput?.dispatchEvent(enterEvent);
  }, 10);
}

/**
 * Subtracts LP and focuses the LP input.
 */
export function subLP(cache: DOMElementCache, setLPInputFocused: (focused: boolean) => void): void {
  if (cache.subButton) cache.subButton.click();
  setLPInputFocused(true);
}

/**
 * Adds LP and focuses the LP input.
 */
export function addLP(cache: DOMElementCache, setLPInputFocused: (focused: boolean) => void): void {
  if (cache.addButton) cache.addButton.click();
  setLPInputFocused(true);
}

/**
 * Toggles the graveyard view.
 */
export function toggleGraveYardView(cache: DOMElementCache): void {
  if (cache.view && cache.view.style.display === "block") {
    closeViewMenu(cache);
  } else {
    cache.graveyard?.click();
  }
}

/**
 * Toggles the banished view.
 */
export function toggleBanishedView(cache: DOMElementCache): void {
  if (cache.view && cache.view.style.display === "block") {
    closeViewMenu(cache);
  } else {
    cache.banished?.click();
  }
}

/**
 * Handles the think button click.
 */
export function handleThinkButton(cache: DOMElementCache): void {
  cache.thunk?.click();
}

/**
 * Handles thumbs up press.
 */
export function thumbsUpPress(cache: DOMElementCache): void {
  cache.thumbsUp?.click();
  const mouseDownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  cache.thumbsUp?.dispatchEvent(mouseDownEvent);
}

/**
 * Handles thumbs up release.
 */
export function thumbsUpRelease(cache: DOMElementCache): void {
  const mouseUpEvent = new MouseEvent("mouseup", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  cache.thumbsUp?.dispatchEvent(mouseUpEvent);
}

/**
 * Toggles the chat box focus state.
 */
export function handleChatBox(
  cache: DOMElementCache,
  chatInputFocused: boolean,
  LPInputFocused: boolean,
  setChatInputFocused: (focused: boolean) => void,
  setLPInputFocused: (focused: boolean) => void
): void {
  if (!chatInputFocused && !LPInputFocused) {
    cache.chatInput?.focus();
    setChatInputFocused(true);
  } else if (LPInputFocused) {
    cache.LPInput?.blur();
    setLPInputFocused(false);
  } else if (chatInputFocused) {
    cache.chatInput?.blur();
    setChatInputFocused(false);
  }
}

/**
 * Executes a card play action by finding and clicking the appropriate menu button.
 * Searches the card hover menu for a button with matching text content.
 * Supports multiple action names as fallbacks (e.g., ["TO_GRAVE", "TO_GRAVEYARD"]).
 * Stops at the first matching action found.
 *
 * @param action - Action name(s) to search for. Can be a string or array of strings for fallback options
 */
export function playCard(action: string | [string] | [string, string]): void {
  const cardHoverMenuDiv = document.getElementById("card_menu_content") as HTMLElement;
  const cardHoverMenuActions = cardHoverMenuDiv?.getElementsByClassName(
    "card_menu_btn"
  ) as HTMLCollectionOf<HTMLElement>;

  const actions = Array.isArray(action) ? action : [action];
  debug.log(action);
  for (const act of actions) {
    debug.log(act);
    debug.log(actions);
    for (const element of cardHoverMenuActions) {
      const span = element?.getElementsByTagName("span")[0];
      if (span && span.textContent === act) {
        span.click();
        return;
      }
    }
  }
}

/**
 * Creates the action function map that maps action names to their execution functions.
 * This map is used by the hotkey handler to execute actions when hotkeys are pressed.
 * Each action name from ACTION_NAMES is mapped to a function that performs the corresponding game action.
 *
 * @param cache - DOM element cache containing all game UI elements
 * @param state - Current state object containing focus states and setters
 * @returns Record mapping action names to their execution functions
 */
export function createActionFunctionMap(
  cache: DOMElementCache,
  state: {
    chatInputFocused: boolean;
    LPInputFocused: boolean;
    setChatInputFocused: (focused: boolean) => void;
    setLPInputFocused: (focused: boolean) => void;
  }
): Record<string, () => void> {
  return {
    [ACTION_NAMES.CLOSE_VIEW_MENU]: () => closeViewMenu(cache),
    [ACTION_NAMES.VIEW_GRAVEYARD]: () => toggleGraveYardView(cache),
    [ACTION_NAMES.VIEW_BANISH]: () => toggleBanishedView(cache),
    [ACTION_NAMES.VIEW_MAIN_DECK]: () => handleDeckView("Main", cache),
    [ACTION_NAMES.VIEW_EXTRA_DECK]: () => handleDeckView("Extra", cache),
    [ACTION_NAMES.THINK]: () => handleThinkButton(cache),
    [ACTION_NAMES.THUMBS_UP]: () => thumbsUpPress(cache),
    [ACTION_NAMES.TOGGLE_CHAT_BOX]: () =>
      handleChatBox(
        cache,
        state.chatInputFocused,
        state.LPInputFocused,
        state.setChatInputFocused,
        state.setLPInputFocused
      ),
    [ACTION_NAMES.DECLARE]: () => playCard(ACTION_NAMES.DECLARE),
    [ACTION_NAMES.TO_HAND]: () => playCard(ACTION_NAMES.TO_HAND),
    [ACTION_NAMES.TO_EXTRA_DECK]: () => playCard(ACTION_NAMES.TO_EXTRA_DECK),
    [ACTION_NAMES.TO_EXTRA_DECK_FU]: () => playCard(ACTION_NAMES.TO_EXTRA_DECK_FU),
    [ACTION_NAMES.TO_ST]: () => playCard(ACTION_NAMES.TO_ST),
    [ACTION_NAMES.ACTIVATE]: () => playCard(ACTION_NAMES.ACTIVATE),
    [ACTION_NAMES.OVERLAY]: () => playCard(ACTION_NAMES.OVERLAY),
    [ACTION_NAMES.S_SUMMON_ATK]: () => playCard(ACTION_NAMES.S_SUMMON_ATK),
    [ACTION_NAMES.SS_ATK]: () => playCard(ACTION_NAMES.SS_ATK),
    [ACTION_NAMES.OL_ATK]: () => playCard(ACTION_NAMES.OL_ATK),
    [ACTION_NAMES.S_SUMMON_DEF]: () => playCard(ACTION_NAMES.S_SUMMON_DEF),
    [ACTION_NAMES.SS_DEF]: () => playCard(ACTION_NAMES.SS_DEF),
    [ACTION_NAMES.OL_DEF]: () => playCard(ACTION_NAMES.OL_DEF),
    [ACTION_NAMES.NORMAL_SUMMON]: () => playCard(ACTION_NAMES.NORMAL_SUMMON),
    [ACTION_NAMES.SET]: () => playCard(ACTION_NAMES.SET),
    [ACTION_NAMES.DETACH]: () => playCard(ACTION_NAMES.DETACH),
    [ACTION_NAMES.TO_GRAVEYARD]: () => playCard(ACTION_NAMES.TO_GRAVEYARD),
    [ACTION_NAMES.TO_GRAVE]: () => playCard(ACTION_NAMES.TO_GRAVE),
    [ACTION_NAMES.BANISH]: () => playCard(ACTION_NAMES.BANISH),
    [ACTION_NAMES.BANISH_T]: () => handleDeckOptions("Main", "banish", cache),
    [ACTION_NAMES.BANISH_FD]: () => playCard(ACTION_NAMES.BANISH_FD),
    [ACTION_NAMES.TO_B_DECK]: () => playCard(ACTION_NAMES.TO_B_DECK),
    [ACTION_NAMES.TO_BOTTOM_OF_DECK]: () => playCard(ACTION_NAMES.TO_BOTTOM_OF_DECK),
    [ACTION_NAMES.MILL_1]: () => saySomething("/mill 1", cache),
    [ACTION_NAMES.MILL_2]: () => saySomething("/mill 2", cache),
    [ACTION_NAMES.MILL_3]: () => saySomething("/mill 3", cache),
    [ACTION_NAMES.MILL_4]: () => saySomething("/mill 4", cache),
    [ACTION_NAMES.MILL_5]: () => saySomething("/mill 5", cache),
    [ACTION_NAMES.MILL_6]: () => saySomething("/mill 6", cache),
    [ACTION_NAMES.SUB_LP]: () => subLP(cache, state.setLPInputFocused),
    [ACTION_NAMES.ADD_LP]: () => addLP(cache, state.setLPInputFocused),
    [ACTION_NAMES.TARGET]: () => playCard(ACTION_NAMES.TARGET),
  };
}
