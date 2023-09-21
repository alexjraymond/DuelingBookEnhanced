import { OptionsTypes } from "./utilities/optionsUtility";

window.onload = function () {
  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn');
  const gY = document.getElementById('grave_hidden');
  const view = document.getElementById('view') as HTMLElement;
  const closeViewButton = view?.getElementsByClassName('exit_btn')[0] as HTMLElement;
  const skipIntroButton = document.getElementById('skip_intro_btn') as HTMLElement
  const enterButton = document.getElementById('duel_btn') as HTMLElement

  // Function to inject a CSS file into the page
  function injectStylesheet(filename:string) {
    const link = document.createElement('link');
    link.href = chrome.runtime.getURL(`css/${filename}`);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

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

  function skipIntro(skipIntroButton: HTMLElement) {
    if (skipIntroButton.style.display !== 'none') {
      console.log('Intro is visible, skipping...');
      skipIntroButton.click();
    }
  }

  function autoConnect(skipIntroButton: HTMLElement, enterButton: HTMLElement) {
    // Create a MutationObserver to wait for skipIntroButton to become hidden
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'style') {
          const newStyle = (mutation.target as HTMLElement).style.display;
          const oldStyle = mutation.oldValue;
          if (newStyle === 'none' && oldStyle !== 'none') {
            enterButton.click();
            // Disconnect the observer since we only need to trigger this once
            observer.disconnect();
            break;
          }
        }
      }
    });

    // Start observing the skipIntroButton
    observer.observe(skipIntroButton, { attributes: true, attributeOldValue: true });
  }

  function applyDarkMode() {
    const osViewports = document.querySelectorAll('.os_viewport');
    const textInputProxies = document.querySelectorAll('.textinput.proxy');
    const watchers = document.getElementById('watchers') as HTMLElement;
    const textInputElements = document.querySelectorAll('input[type="text"]');

    osViewports.forEach((node) => node.classList.add('dark-mode'));
    textInputProxies.forEach((node) => node.classList.add('dark-mode'));
    watchers.classList.add('dark-mode');
    textInputElements.forEach((node) => node.classList.add('dark-mode'))
  }

  function removeDarkMode() {
    const osViewports = document.querySelectorAll('.os_viewport');
    const textInputProxies = document.querySelectorAll('.textinput.proxy');
    const watchers = document.getElementById('watchers') as HTMLElement;
    const textInputElements = document.querySelectorAll('input[type="text"]');

    osViewports.forEach((node) => node.classList.remove('dark-mode'));
    textInputProxies.forEach((node) => node.classList.remove('dark-mode'));
    watchers.classList.remove('dark-mode');
    textInputElements.forEach((node) => node.classList.remove('dark-mode'))
  }

  // chat variables
  const chatInput = document.querySelectorAll('input.cin_txt')[1] as HTMLInputElement
  let chatInputFocused = false;

  const toggleDarkMode = () => {
    const osViewports = document.querySelectorAll('.os_viewport')
    const textInputProxies = document.querySelectorAll('.textinput.proxy')
    const watchers = document.getElementById('watchers') as HTMLElement
    const textInputElements = document.querySelectorAll('input[type="text"]');

    osViewports.forEach((node) => node.classList.toggle('dark-mode'))
    textInputProxies.forEach((node) => node.classList.toggle('dark-mode'))
    watchers.classList.toggle('dark-mode')
    textInputElements.forEach((node) => node.classList.toggle('dark-mode'))
  }

  // specific div selectors
  const deck = document.getElementById('deck_hidden') as HTMLElement;
  const extraDeck = document.getElementById('extra_hidden') as HTMLElement;
  let deckMenu = document.getElementById('card_menu_content') as HTMLElement;
  let deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[0] as HTMLElement;
  let deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;


  // the ultimate keydown listener
  document.addEventListener('keydown', (e) => {
    const handler = e.key.toLowerCase();
    if (!(e.target instanceof HTMLInputElement) || handler === 'enter') {
      console.log('Key pressed:', handler);
      // hotkey hash table 👍
    const hotkeyHashMap: Record<string, { div: HTMLElement | null, name: string }> = {
      'escape': {
        div: null,
        name: 'view menu'
      },
      'g': {
        div: gY,
        name: 'GY'
      },
      'v': {
        div: deckViewSpan,
        name: 'deck'
      },
      'e': {
        div: deckViewSpan,
        name: 'extra deck'
      },
    };

    // toggle view function 👍
    const toggleView = (handler: string) => {
      // Check if the handler is in the hotkeyHashMap
      if (hotkeyHashMap[handler]) {
        const { div, name } = hotkeyHashMap[handler];
        console.log(div, name)
        if (view && view.style.display === 'block') {
          console.log(`Closing the ${name}`);
          closeViewButton.click();
        } else if (div) {
          console.log(`Opening the ${name}`);
          div.click();
        }
      }
    };

    // close any view menu
    if (handler === 'escape') {
      toggleView(handler)
    }

    // toggle graveyard view 👍
    if (handler === 'g') {
      toggleView(handler)
    }

    // toggle deck or extra deck view 👍
    if (handler === 'v' || handler === 'e') {
      const mouseOverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
      if (handler === 'v') {
        deck.dispatchEvent(mouseOverEvent)
      } else if (handler === 'e') {
        extraDeck.dispatchEvent(mouseOverEvent)
      }
      deckMenu = document.getElementById('card_menu_content') as HTMLElement;
      deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[0] as HTMLElement;
      deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;
      if (deckViewSpan && deckViewSpan.textContent === 'View') {
        deckViewSpan.click()
      } else if (deckViewSpan && deckViewSpan.textContent === 'Show') {
        deckViewButton = deckMenu?.getElementsByClassName('card_menu_btn')[1] as HTMLElement;
        deckViewSpan = deckViewButton?.getElementsByTagName('span')[0] as HTMLElement;
        deckViewSpan.click()
      } else {
        const { name } = hotkeyHashMap[handler]
        console.log(`Closing the ${name}`);
        closeViewButton.click();
      }
    }

    // send to Graveyard (it has to be above the 'd' if statement) 👍 shift + d
    if (e.shiftKey && handler === 'd') {
      console.log('shift pressed')
      const cardHoverMenuDiv = document.getElementById('card_menu_content')
      if (cardHoverMenuDiv) {
        const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
        for (const cardMenuBtnDiv of cardMenuBtnDivs) {
          const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
          if (spanElement && spanElement?.textContent?.trim() === 'To Grave') {
            (spanElement as HTMLElement).click();
            break;
          }
          else if (spanElement && spanElement?.textContent?.trim() === 'To Graveyard') {
            (spanElement as HTMLElement).click();
            break;
          }
        }
      }
    }

    // add back to hand 👍 h
    if (handler === 'h') {
      const cardHoverMenuDiv = document.getElementById('card_menu_content')
      if (cardHoverMenuDiv) {
        const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
        for (const cardMenuBtnDiv of cardMenuBtnDivs) {
          const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
          if (spanElement && spanElement?.textContent?.trim() === 'To Hand') {
            (spanElement as HTMLElement).click();
            break;
          }
        }
      }
    }

    // Activate card 👍 a
    if (handler === 'a') {
      const cardHoverMenuDiv = document.getElementById('card_menu_content')
      if (cardHoverMenuDiv) {
        const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
        for (const cardMenuBtnDiv of cardMenuBtnDivs) {
          const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
          if (spanElement && spanElement?.textContent?.trim() === 'Activate') {
            (spanElement as HTMLElement).click();
            break;
          }
          else if (spanElement && spanElement?.textContent?.trim() === 'To S/T') {
            (spanElement as HTMLElement).click();
            break;
          }
        }
      }
    }

    // Set card 👍 shift + s
    if (e.shiftKey && handler === 's') {
      console.log('shift pressed')
      const cardHoverMenuDiv = document.getElementById('card_menu_content')
      if (cardHoverMenuDiv) {
        const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
        for (const cardMenuBtnDiv of cardMenuBtnDivs) {
          const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
          if (spanElement && spanElement?.textContent?.trim() === 'Set') {
            (spanElement as HTMLElement).click();
            break;
          }
        }
      }
    }

    // think button 👍
      if (handler === 't') {
        console.log('Clicking "think_btn"');
        thunk?.click();
        chatInput.value = 'hm'
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
        });
        setTimeout(() => {
          chatInput.focus()
          chatInput.dispatchEvent(enterEvent);
        }, 30);
        setTimeout(() => {
          chatInput.blur()
        }, 30);
      }

      // thumbs up button 👍
      if (handler === 'f') {
        console.log('Clicking good_btn')
        thumbsUp?.click();
      }

      // focus chat window (not yet working)
      if (handler === 'enter') {
        if (!chatInputFocused) {
          chatInput.focus()
          chatInputFocused = true
        } else {
          chatInput.blur()
          chatInputFocused = false
        }
      }

      // Special Summon a card that has "SS ATK" or "s. Summon ATK" in the menu 👍
      if (handler === 's') {
        const cardHoverMenuDiv = document.getElementById('card_menu_content')
        if (cardHoverMenuDiv) {
          const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
          for (const cardMenuBtnDiv of cardMenuBtnDivs) {
            const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
            if (spanElement && spanElement?.textContent?.trim() === 'SS ATK') {
              (spanElement as HTMLElement).click();
              break;
            }
            else if (spanElement && spanElement?.textContent?.trim() === 'S. Summon ATK') {
              (spanElement as HTMLElement).click();
              break;
            }
          }
        }
      }

      // Declare effect on mouseover 👍
      if (handler === 'd') {
        const cardHoverMenuDiv = document.getElementById('card_menu_content')
        if (cardHoverMenuDiv) {
          const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
          for (const cardMenuBtnDiv of cardMenuBtnDivs) {
            const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
            if (spanElement && spanElement?.textContent?.trim() === 'Declare') {
              (spanElement as HTMLElement).click();
              break;
            }
          }
        }
      }

      if (handler === 'd') {
        const cardHoverMenuDiv = document.getElementById('card_menu_content')
        if (cardHoverMenuDiv) {
          const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
          for (const cardMenuBtnDiv of cardMenuBtnDivs) {
            const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
            if (spanElement && spanElement?.textContent?.trim() === 'Declare') {
              (spanElement as HTMLElement).click();
              break;
            }
          }
        }
      }

      // Normal Summon on mouseover 👍
      if (handler === 'n') {
        const cardHoverMenuDiv = document.getElementById('card_menu_content')
        if (cardHoverMenuDiv) {
          const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
          for (const cardMenuBtnDiv of cardMenuBtnDivs) {
            const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
            if (spanElement && spanElement?.textContent?.trim() === 'Normal Summon') {
              (spanElement as HTMLElement).click();
              break;
            }
          }
        }
      }
    }
  })
}
