import { OptionsTypes } from "./utilities/optionsUtility";
import { injectStylesheet, applyDarkMode, removeDarkMode } from "./utilities/darkModeUtility";
import { autoConnect, skipIntro } from "./utilities/optionsUtility";
import { loadHotkeysConfig } from "./utilities/configUtility";

window.onload = async function () {
  // Load hotkeys configuration first
  const hotkeyHashMap = await loadHotkeysConfig();
  console.log('Loaded hotkeys configuration:', hotkeyHashMap);

  injectStylesheet('dark-mode.css');

  // Check the user's settings on load
  chrome.storage.sync.get('options', (result) => {
    const options = result.options as OptionsTypes;
    if (options && options.skipIntro && options.autoConnect) autoConnect(skipIntroButton, enterButton) // If both are enabled, then autoConnect also skips the intro
    if (options && options.skipIntro) skipIntro(skipIntroButton)
    if (options && options.autoConnect) autoConnect(skipIntroButton, enterButton)
    if (options && options.isNightMode) applyDarkMode();
    if (options && !options.isNightMode) removeDarkMode();
  });

  // Update the settings when the user makes changes
  function handleOptionsChange(
    changes: { [key: string]: any },
    namespace: string
  ) {
    if (namespace === "sync") {
      if (changes.options && "newValue" in changes.options) {
        const newOptions = changes.options.newValue as OptionsTypes;
        console.log("Options have changed:", newOptions);

        if (newOptions.skipIntro && newOptions.autoConnect) autoConnect // If both are enabled, then autoConnect also skips the intro
        if (newOptions.skipIntro) skipIntro(skipIntroButton)
        if (newOptions.autoConnect) autoConnect(skipIntroButton, enterButton)
        if (newOptions.isNightMode) applyDarkMode();
        if (!newOptions.isNightMode) removeDarkMode();
      }
    }
  }

  // Add the event listener for options changes
  chrome.storage.onChanged.addListener(handleOptionsChange);

  // chat variables
  const chatInput = document.querySelectorAll('input.cin_txt')[1] as HTMLInputElement
  let chatInputFocused = false;

  // specific div selectors
  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn');
  const gY = document.getElementById('grave_hidden');
  const view = document.getElementById('view') as HTMLElement;
  const closeViewButton = view?.getElementsByClassName('exit_btn')[0] as HTMLElement;
  const skipIntroButton = document.getElementById('skip_intro_btn') as HTMLElement
  const enterButton = document.getElementById('duel_btn') as HTMLElement
  const deck = document.getElementById('deck_hidden') as HTMLElement;
  const extraDeck = document.getElementById('extra_hidden') as HTMLElement;
  let deckMenu = document.getElementById('card_menu_content') as HTMLElement;
  let deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[0] as HTMLElement;
  let deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;

  type DivHashMap = {
    [key: string]: HTMLElement | null;
  };

  const divHashMap: DivHashMap = {
    'gY': gY,
    'deckViewSpan': deckViewSpan,
  }

  function handleHotKey(key: string, hotkeyHashMap: Record<string, any>) {
    const hotkey = hotkeyHashMap[key];
    if (hotkey) {
      const { div, name } = hotkey;
      console.log(div, name);
      if (view && view.style.display === 'block') {
        console.log(`Closing the ${name}`);
        closeViewButton.click();
      } else if (div) {
        console.log(`Opening the ${name}`);
        if (divHashMap[div]) {
          const target = divHashMap[div];
          target?.click();
        }
      }
    }
  }

  function handleThinkButton() {
    console.log('Clicking "think_btn"');
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
    console.log('Clicking good_btn');
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

  function playCard(action: string) {
    const cardHoverMenuDiv = document.getElementById('card_menu_content');
    if (cardHoverMenuDiv) {
      const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
      for (const cardMenuBtnDiv of cardMenuBtnDivs) {
        const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
        console.log(spanElement)
        if (spanElement && spanElement.textContent?.trim() === action) {
          (spanElement as HTMLElement).click();
          break;
        }
      }
    }
  }

  // the ultimate keydown listener
  document.addEventListener('keydown', (e) => {

  const handler = e.key.toLowerCase();

    function handleDeckView() {
      const mouseOverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      if (handler === 'v') {
        deck.dispatchEvent(mouseOverEvent);
      } else if (handler === 'e') {
        extraDeck.dispatchEvent(mouseOverEvent);
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
        closeViewButton.click();
      }
    }

  if (!(e.target instanceof HTMLInputElement) || handler === 'enter') {
    console.log('Key pressed:', handler);
    handleHotKey(handler, hotkeyHashMap);

      switch (handler) {
        case 'v':
        case 'e':
          handleDeckView();
          break;
        case 't':
          handleThinkButton();
          break;
        case 'f':
          handleThumbsUpButton();
          break;
        case 'enter':
          handleChatBox();
          break;
        /* hotkeys below this line only work if you hover the card you want */
        case 'd':
          playCard('To Graveyard');
          break;
        case 'h':
          playCard('To Hand');
          break;
        case 'a':
          playCard('Activate');
          break;
        case 's':
          playCard('S. Summon ATK');
          break;
        case 'n':
          playCard('Normal Summon');
          break;
        case 'j':
          playCard('Set');
          break;
      }
    }
  })
}
