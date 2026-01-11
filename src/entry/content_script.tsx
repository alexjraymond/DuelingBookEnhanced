import {
  OptionsTypes,
  autoConnect,
  skipIntro,
  injectStylesheet,
  applyDarkMode,
  removeDarkMode,
  loadHotkeysConfig,
  getActionsForHotkey,
} from "../utilities";
import { MessageType } from "../types";
import { ACTION_NAMES } from "../data";
import { Logger } from "../services";
import { debounce } from "lodash";

const debug = new Logger("content_script");

let view: HTMLElement | null;
let closeViewButton: HTMLElement | null;
let deck: HTMLElement | null;
let extraDeck: HTMLElement | null;
let deckMenu: HTMLElement | null;
let deckViewButton: HTMLElement | null;
let deckViewSpan: HTMLElement | null;
let deckBanishButton: HTMLElement | null;
let deckBanishSpan: HTMLElement | null;
let LPInput: HTMLElement | null;
let subButton: HTMLElement | null;
let addButton: HTMLElement | null;

function closeViewMenu() {
  closeViewButton?.click();
}

function handleDeckView(deckType: string) {
  const mouseOverEvent = new MouseEvent("mouseover", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === "Main") {
    deck?.dispatchEvent(mouseOverEvent);
  } else if (deckType === "Extra") {
    extraDeck?.dispatchEvent(mouseOverEvent);
  }

  deckMenu = document.getElementById("card_menu_content") as HTMLElement;
  deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[0] as HTMLElement;
  deckViewSpan = deckViewButton?.getElementsByTagName("span")[0] as HTMLElement;

  if (deckViewSpan && deckViewSpan.textContent === "View") {
    deckViewSpan.click();
  } else if (deckViewSpan && deckViewSpan.textContent === "Show") {
    deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[1] as HTMLElement;
    deckViewSpan = deckViewButton?.getElementsByTagName("span")[0] as HTMLElement;
    deckViewSpan.click();
  } else {
    closeViewMenu();
  }
}

function handleDeckOptions(deckType: string, action: string) {
  const mouseOverEvent = new MouseEvent("mouseover", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === "Main") {
    deck?.dispatchEvent(mouseOverEvent);
  }

  deckMenu = document.getElementById("card_menu_content") as HTMLElement;

  if (action === "banish") {
    deckBanishButton = deckMenu?.getElementsByClassName("card_menu_btn")[2] as HTMLElement;
    deckBanishSpan = deckBanishButton?.getElementsByTagName("span")[0] as HTMLElement;
    debug.log("banish button", deckBanishButton);
    debug.log("banish span", deckBanishSpan);
    deckBanishSpan.click();
  }
}

window.onload = async function () {
  view = document.getElementById("view") as HTMLElement;
  closeViewButton = view?.getElementsByClassName("exit_btn")[0] as HTMLElement;
  deck = document.getElementById("deck_hidden") as HTMLElement;
  extraDeck = document.getElementById("extra_hidden") as HTMLElement;
  deckMenu = document.getElementById("card_menu_content") as HTMLElement;
  deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[0] as HTMLElement;
  deckViewSpan = deckViewButton?.getElementsByTagName("span")[0] as HTMLElement;
  LPInput = document.getElementById("life_txt") as HTMLElement;
  subButton = document.getElementById("plus_btn") as HTMLElement;
  addButton = document.getElementById("minus_btn") as HTMLElement;

  let options: OptionsTypes;

  const actionFunctionMap: Record<string, () => void> = {
    [ACTION_NAMES.CLOSE_VIEW_MENU]: closeViewMenu,
    [ACTION_NAMES.VIEW_GRAVEYARD]: toggleGraveYardView,
    [ACTION_NAMES.VIEW_BANISH]: toggleBanishedView,
    [ACTION_NAMES.VIEW_MAIN_DECK]: () => handleDeckView("Main"),
    [ACTION_NAMES.VIEW_EXTRA_DECK]: () => handleDeckView("Extra"),
    [ACTION_NAMES.THINK]: handleThinkButton,
    [ACTION_NAMES.THUMBS_UP]: thumbsUpPress,
    [ACTION_NAMES.TOGGLE_CHAT_BOX]: handleChatBox,
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
    [ACTION_NAMES.BANISH_T]: () => handleDeckOptions("Main", "banish"),
    [ACTION_NAMES.BANISH_FD]: () => playCard(ACTION_NAMES.BANISH_FD),
    [ACTION_NAMES.TO_B_DECK]: () => playCard(ACTION_NAMES.TO_B_DECK),
    [ACTION_NAMES.TO_BOTTOM_OF_DECK]: () => playCard(ACTION_NAMES.TO_BOTTOM_OF_DECK),
    [ACTION_NAMES.MILL_1]: () => saySomething("/mill 1"),
    [ACTION_NAMES.MILL_2]: () => saySomething("/mill 2"),
    [ACTION_NAMES.MILL_3]: () => saySomething("/mill 3"),
    [ACTION_NAMES.MILL_4]: () => saySomething("/mill 4"),
    [ACTION_NAMES.MILL_5]: () => saySomething("/mill 5"),
    [ACTION_NAMES.MILL_6]: () => saySomething("/mill 6"),
    [ACTION_NAMES.SUB_LP]: () => subLP(),
    [ACTION_NAMES.ADD_LP]: () => addLP(),
    [ACTION_NAMES.TARGET]: () => playCard(ACTION_NAMES.TARGET),
  };

  let hotkeyHashMap = await loadHotkeysConfig();

  async function fetchHotKeyHashMap() {
    hotkeyHashMap = await loadHotkeysConfig();
    debug.log("Loaded hotkeys configuration:", hotkeyHashMap);
  }

  injectStylesheet("dark-mode.css");

  chrome.storage.sync.get("options", (result) => {
    options = result.options as OptionsTypes;
    if (options && options.disableAllOptions) {
      // set all options to false, ensure dark mode is off, and don't run other functions
      options.disableHotkeys = true;
      options.skipIntro = false;
      options.autoConnect = false;
      options.isNightMode = false;
      removeDarkMode();
      hotkeyHashMap = [];
    } else {
      if (options.disableHotkeys) {
        hotkeyHashMap = [];
      } else {
        fetchHotKeyHashMap();
      }
      if (options && options.skipIntro && options.autoConnect)
        autoConnect(skipIntroButton, enterButton);
      if (options && options.skipIntro) skipIntro(skipIntroButton);
      if (options && options.autoConnect) autoConnect(skipIntroButton, enterButton);
      if (options && options.isNightMode) applyDarkMode();
      if (options && !options.isNightMode) removeDarkMode();
    }
    chrome.storage.onChanged.addListener(handleOptionsChange);
  });

  function handleOptionsChange(
    changes: Record<string, chrome.storage.StorageChange>,
    namespace: string
  ) {
    if (namespace === "sync") {
      if (changes.options && "newValue" in changes.options) {
        const newOptions = changes.options.newValue as OptionsTypes;
        debug.log("Options have changed:", newOptions);

        if (newOptions.disableAllOptions) {
          // set all options to false, ensure dark mode is off, and don't run other functions
          newOptions.skipIntro = false;
          newOptions.autoConnect = false;
          newOptions.isNightMode = false;
          removeDarkMode();
          hotkeyHashMap = [];
        } else {
          if (newOptions.disableHotkeys) {
            hotkeyHashMap = [];
          } else {
            fetchHotKeyHashMap();
          }
          if (newOptions.skipIntro && newOptions.autoConnect)
            autoConnect(skipIntroButton, enterButton);
          if (newOptions.skipIntro) skipIntro(skipIntroButton);
          if (newOptions.autoConnect) autoConnect(skipIntroButton, enterButton);
          if (newOptions.isNightMode) applyDarkMode();
          if (!newOptions.isNightMode) removeDarkMode();
        }
      }
    }
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MessageType.HOTKEYS_CHANGED) {
      debug.log("Received updated hotkeys:", message.payload);
      hotkeyHashMap = message.payload; // update the hotkeys map.
      return true;
    }
  });

  const chatInput = document.querySelectorAll("input.cin_txt")[1] as HTMLInputElement;
  let chatInputFocused = false;
  let LPInputFocused = false;
  const thunk = document.getElementById("think_btn");
  const thumbsUp = document.getElementById("good_btn");
  const graveyard = document.getElementById("grave_hidden");
  const banished = document.getElementById("banished_hidden");
  const skipIntroButton = document.getElementById("skip_intro_btn") as HTMLElement;
  const enterButton = document.getElementById("duel_btn") as HTMLElement;

  function saySomething(message: string) {
    chatInput.value = message;
    const enterEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
    });

    handleChatBox();
    setTimeout(() => {
      chatInput.dispatchEvent(enterEvent);
    }, 10);
  }

  function subLP() {
    if (subButton) subButton.click();
    LPInputFocused = true;
  }

  function addLP() {
    if (addButton) addButton.click();
    LPInputFocused = true;
  }

  function toggleGraveYardView() {
    if (view && view.style.display === "block") {
      closeViewMenu();
    } else {
      graveyard?.click();
    }
  }

  function toggleBanishedView() {
    if (view && view.style.display === "block") {
      closeViewMenu();
    } else {
      banished?.click();
    }
  }

  function handleThinkButton() {
    thunk?.click();
  }

  function thumbsUpPress() {
    thumbsUp?.click();
    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    thumbsUp?.dispatchEvent(mouseDownEvent);
  }

  function thumbsUpRelease() {
    const mouseUpEvent = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    thumbsUp?.dispatchEvent(mouseUpEvent);
  }

  function handleChatBox() {
    if (!chatInputFocused && !LPInputFocused) {
      chatInput.focus();
      chatInputFocused = true;
    } else if (LPInputFocused) {
      LPInput?.blur();
      LPInputFocused = false;
    } else if (chatInputFocused) {
      chatInput.blur();
      chatInputFocused = false;
    }
  }

  function playCard(action: string | [string] | [string, string]) {
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
        if (span && span.textContent === action) {
          span.click();
          return;
        }
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    const handler = e.key.toLowerCase();
    if (!(e.target instanceof HTMLInputElement) || handler === "enter") {
      debug.log("Key pressed:", handler);
      const actions = getActionsForHotkey(handler, hotkeyHashMap);
      debug.log("actions", actions);
      if (actions.length > 0) {
        actions.forEach((action) => {
          const hotkeyEntry = hotkeyHashMap.find((hk) => hk.action === action);
          if (hotkeyEntry && hotkeyEntry.disabled) {
            debug.log("Hotkey is disabled:", action);
            return;
          }
          if (action in actionFunctionMap) {
            actionFunctionMap[action]();
            debug.log("Action executed:", action);
          } else {
            debug.log("Action function not found for:", action);
          }
        });
      } else {
        debug.log("No matching actions found.");
      }
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    const handler = e.key.toLowerCase();

    if (
      !(e.target instanceof HTMLInputElement) &&
      chatInput !== document.activeElement &&
      LPInput !== document.activeElement
    ) {
      debug.log(chatInput !== document.activeElement);
      const actions = getActionsForHotkey(handler, hotkeyHashMap);
      if (actions.includes(ACTION_NAMES.THUMBS_UP)) {
        thumbsUpRelease();
      }
    }
  }

  // adjust this timer for user responsiveness
  const debouncedKeyDown = debounce((e: KeyboardEvent) => handleKeyDown(e), 150);
  const debouncedKeyUp = debounce((e: KeyboardEvent) => handleKeyUp(e), 160);

  document.addEventListener("keydown", debouncedKeyDown);
  document.addEventListener("keyup", debouncedKeyUp);
};
