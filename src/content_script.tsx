window.onload = function () {
  const thunk = document.getElementById('think_btn');

  document.addEventListener('keydown', (e) => {
    const handler = e.key.toLowerCase();
    console.log('Key pressed:', handler);
  
    if (!(e.target instanceof HTMLInputElement)) {
      if (handler === 't') {
        console.log('Clicking "think_btn"');
        thunk?.click();
      }
    }
  });

  console.log('Page has been reloaded');
};