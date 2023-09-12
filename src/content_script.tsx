


window.onload = function () {
  
  const thunk = document.getElementById('think_btn')
  document.addEventListener('keydown', (e) => {
    e.preventDefault();

    const handler = "KeyT"
    
    if (handler) {
      thunk?.click();
      return;
    }
    
    console.log('Pressed a key without a handler.')
});
  console.log(thunk)
  console.log('Page has been reloaded');
};