import { OptionsTypes } from "./utilities/optionsUtility";
import { injectStylesheet, applyDarkMode, removeDarkMode } from "./utilities/darkModeUtility";
import { autoConnect, skipIntro } from "./utilities/optionsUtility";
import { loadHotkeysConfig } from "./utilities/configUtility";
import { debounce } from "lodash";

let view: HTMLElement | null;
let closeViewButton: HTMLElement | null;
let deck: HTMLElement | null;
let extraDeck: HTMLElement | null;
let deckMenu: HTMLElement | null;
let deckViewButton: HTMLElement | null;
let deckViewSpan: HTMLElement | null;

function closeViewMenu() {
  closeViewButton?.click();
}

function handleDeckView(deckType: string) {
  const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === 'Main') {
    deck?.dispatchEvent(mouseOverEvent);
  } else if (deckType === 'Extra') {
    extraDeck?.dispatchEvent(mouseOverEvent);
  }

  deckMenu = document.getElementById('card_menu_content') as HTMLElement;
  deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[0] as HTMLElement;
  deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;

  if (deckViewSpan && deckViewSpan.textContent === 'View') {
    deckViewSpan.click();
  } else if (deckViewSpan && deckViewSpan.textContent === 'Show') {
    deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[1] as HTMLElement;
    deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;
    deckViewSpan.click();
  } else {
    closeViewMenu()
  }
}

window.onload = async function () {
  view = document.getElementById('view') as HTMLElement;
  closeViewButton = view?.getElementsByClassName('exit_btn')[0] as HTMLElement;
  deck = document.getElementById('deck_hidden') as HTMLElement;
  extraDeck = document.getElementById('extra_hidden') as HTMLElement;
  deckMenu = document.getElementById('card_menu_content') as HTMLElement;
  deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[0] as HTMLElement;
  deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;

  const actionFunctionMap: Record<string, () => void> = {
    "Close View Menu": closeViewMenu,
    "View Graveyard": toggleGraveYardView,
    "View Main Deck": () => handleDeckView('Main'),
    "View Extra Deck": () => handleDeckView('Extra'),
    "Think": handleThinkButton,
    "Thumbs Up": handleThumbsUpButton,
    "Toggle Chat Box": handleChatBox,
    "To Graveyard": () => playCard("To Graveyard"),
    "To Grave": () => playCard("To Grave"),
    "To Hand": () => playCard("To Hand"),
    "Activate": () => playCard("Activate"),
    "S. Summon ATK": () => playCard("S. Summon ATK"),
    "SS ATK": () => playCard("SS ATK"),
    "Normal Summon": () => playCard("Normal Summon"),
    "Set": () => playCard("Set"),
    "Declare": () => playCard("Declare"),
    "Banish": () => playCard("Banish")
  };

  const hotkeyHashMap = await loadHotkeysConfig();
  console.log('Loaded hotkeys configuration:', hotkeyHashMap);

  injectStylesheet('dark-mode.css');

  chrome.storage.sync.get('options', (result) => {
    const options = result.options as OptionsTypes;
    if (options && options.skipIntro && options.autoConnect) autoConnect(skipIntroButton, enterButton);
    if (options && options.skipIntro) skipIntro(skipIntroButton);
    if (options && options.autoConnect) autoConnect(skipIntroButton, enterButton);
    if (options && options.isNightMode) applyDarkMode();
    if (options && !options.isNightMode) removeDarkMode();
  });

  function handleOptionsChange(changes: { [key: string]: any }, namespace: string) {
    if (namespace === "sync") {
      if (changes.options && "newValue" in changes.options) {
        const newOptions = changes.options.newValue as OptionsTypes;
        console.log("Options have changed:", newOptions);

        if (newOptions.skipIntro && newOptions.autoConnect) autoConnect(skipIntroButton, enterButton);
        if (newOptions.skipIntro) skipIntro(skipIntroButton);
        if (newOptions.autoConnect) autoConnect(skipIntroButton, enterButton);
        if (newOptions.isNightMode) applyDarkMode();
        if (!newOptions.isNightMode) removeDarkMode();
      }
    }
  }

  chrome.storage.onChanged.addListener(handleOptionsChange);

  const chatInput = document.querySelectorAll('input.cin_txt')[1] as HTMLInputElement;
  let chatInputFocused = false;

  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn');
  const graveyard = document.getElementById('grave_hidden');
  const skipIntroButton = document.getElementById('skip_intro_btn') as HTMLElement;
  const enterButton = document.getElementById('duel_btn') as HTMLElement;

  function handleHotKey(key: string, hotkeyHashMap: Record<string, any>) {
    const hotkey = hotkeyHashMap[key];
    if (hotkey) {
      const { action } = hotkey;
      if (Array.isArray(action)) {
        action.forEach((actionName) => {
          const actionFunction = actionFunctionMap[actionName];
          if (actionFunction) {
            actionFunction();
          }
        });
      } else {
        const actionFunction = actionFunctionMap[action];
        if (actionFunction) {
          actionFunction();
        }
      }
    }
  }
  function toggleGraveYardView() {
    if (view && view.style.display === 'block') {
      console.log("Closing the GY");
      closeViewMenu()
    } else {
      graveyard?.click()
      console.log("Opening the GY", graveyard);
    }
  }

  function handleThinkButton() {
    thunk?.click();
    chatInput.value = 'hm';
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
    });
    setTimeout(() => {
      chatInput.focus();
      chatInput.dispatchEvent(enterEvent);
    }, 30);
    setTimeout(() => {
      chatInput.blur();
    }, 30);
  }

  function handleThumbsUpButton() {
    thumbsUp?.click();
  }

  function handleChatBox() {
    if (!chatInputFocused) {
      chatInput.focus();
      chatInputFocused = true;
    } else {
      chatInput.blur();
      chatInputFocused = false;
    }
  }

  function playCard(action: string | [string] | [string, string]) {
    const cardHoverMenuDiv = document.getElementById('card_menu_content') as HTMLElement;
    const cardHoverMenuActions = cardHoverMenuDiv?.getElementsByClassName('card_menu_btn') as HTMLCollectionOf<HTMLElement>;

    const actions = Array.isArray(action) ? action : [action];
    console.log(action)
    for (const act of actions) {
      console.log(act)
      console.log(actions)
    for (const element of cardHoverMenuActions) {

      const span = element?.getElementsByTagName('span')[0];
      if (span && span.textContent === action) {
        span.click();
        return;
      }
    }
  }
  }
  function handleKeydown(e: KeyboardEvent) {
    const handler = e.key.toLowerCase();
    if (!(e.target instanceof HTMLInputElement) || handler === 'enter') {
      console.log('Key pressed:', handler);
      handleHotKey(handler, hotkeyHashMap);
      const actionFunction = actionFunctionMap[handler];
      if (actionFunction) {
        actionFunction();
      }
    }
  }

  const debouncedKeydown = debounce(handleKeydown, 150);

  document.addEventListener('keydown', debouncedKeydown);
}
