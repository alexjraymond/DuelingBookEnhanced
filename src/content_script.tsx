window.onload = function () {
  const thunk = document.getElementById('think_btn');
  const thumbsUp = document.getElementById('good_btn')

  document.addEventListener('keydown', (e) => {
    const handler = e.key.toLowerCase();
    console.log('Key pressed:', handler);
  
    if (!(e.target instanceof HTMLInputElement)) {
      if (handler === 't') {
        console.log('Clicking "think_btn"');
        thunk?.click();
      }
      if (handler === 'f') {
        console.log('Clicking good_btn')
        thumbsUp?.click();

      }
    }
  });

  console.log('Page has been reloaded');
};