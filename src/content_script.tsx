window.onload = function () {
  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn')
  const GY = document.getElementById('grave_hidden')
  const askPhaseChange = document.querySelector('.cin_txt.js-bound') as HTMLInputElement



// the ultimate keydown listener 
  document.addEventListener('keydown', (e) => {
    const handler = e.key.toLowerCase();
    console.log('Key pressed:', handler);
  
// think button
    if (!(e.target instanceof HTMLInputElement)) {
      if (handler === 't') {
        console.log('Clicking "think_btn"');
        thunk?.click();
      }

// thumbs up button
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

// Special Summon a card that has "SS ATK" or "s. Summon ATK" in the menu
      if (handler === 's') {
        const cardHoverMenuDiv = document.getElementById('card_menu_content')
        console.log('s clicked')
        console.log (cardHoverMenuDiv)
        if (cardHoverMenuDiv) {
        console.log(cardHoverMenuDiv)
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
}})}