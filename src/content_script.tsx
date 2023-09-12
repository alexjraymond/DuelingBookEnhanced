window.onload = function () {
  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn')
  const GY = document.getElementById('grave_hidden')
  const askPhaseChange = document.querySelector('.cin_txt.js-bound') as HTMLInputElement



// the ultimate keydown listener 
  document.addEventListener('keydown', (e) => {
    const handler = e.key.toLowerCase();
    console.log('Key pressed:', handler);
 
    
// send to Graveyard (it has to be above the 'd' if statement) 👍   
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
        }}}    
    
// view Extra Deck 👍
    if (handler === 'v') {
      const cardHoverMenuDiv = document.getElementById('card_menu_content')
      if (cardHoverMenuDiv) {
        const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
        for (const cardMenuBtnDiv of cardMenuBtnDivs) {
          const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
            if (spanElement && spanElement?.textContent?.trim() === 'View') {
              (spanElement as HTMLElement).click();
              break;
            }}}}

// think button 👍
    if (!(e.target instanceof HTMLInputElement)) {
      if (handler === 't') {
        console.log('Clicking "think_btn"');
        thunk?.click();
      }

// thumbs up button 👍
      if (handler === 'f') {
        console.log('Clicking good_btn')
        thumbsUp?.click();
      }

// open graveyard (not yet working)
      if (handler === 'g') {
        console.log('Clicking GY')
        GY?.click();
      }

// focus chat window (not yet working)
      if (handler === 'm') {
        console.log('asking for m1')
        askPhaseChange?.focus();
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
      }}
    }
  };

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
          }}}}

          if (handler === 'd') {
            const cardHoverMenuDiv = document.getElementById('card_menu_content')
            if (cardHoverMenuDiv) {
              const cardMenuBtnDivs = cardHoverMenuDiv.querySelectorAll('div.card_menu_btn');
              for (const cardMenuBtnDiv of cardMenuBtnDivs) {
                const spanElement = cardMenuBtnDiv.querySelector('span.card_menu_txt');
                  if (spanElement && spanElement?.textContent?.trim() === 'Declare') {
                    (spanElement as HTMLElement).click();
                    break;
              }}}}

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
    }}}}



    
}})}