// Inject a CSS file into the page
export function injectStylesheet(filename: string) {
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL(`css/${filename}`);
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export function applyDarkMode() {
  const duelOsViewports = document.querySelectorAll('#duel .os_viewport');
  const textInputProxies = document.querySelectorAll('.textinput.proxy');
  const watchers = document.getElementById('watchers') as HTMLElement;
  const textInputElements = document.querySelectorAll('input[type="text"]');
  const previewText = document.getElementById('preview_txt') as HTMLElement;
  const actionList = document.getElementById('action_list');

  duelOsViewports.forEach((node) => node.classList.add('dark-mode'));
  textInputProxies.forEach((node) => node.classList.add('dark-mode'));
  watchers.classList.add('dark-mode');
  textInputElements.forEach((node) => node.classList.add('dark-mode'))
  previewText.classList.add('dark-mode')
  actionList?.classList.add('dark-mode');

  const onlineUsersOsViewports = document.querySelectorAll('#chats .os_viewport')
  const onlineUsersChatBackground = document.querySelectorAll('#chats .chat_background')

  onlineUsersOsViewports.forEach((node) => node.classList.add('dark-mode'));
  onlineUsersChatBackground.forEach((node) => node.classList.add('dark-mode'));

  const mainCssRules = document.styleSheets[0].cssRules
  for (let rule of mainCssRules) {
    let styleRule = rule as CSSStyleRule;
    if (styleRule.selectorText?.includes("cell1")) {
      styleRule.style.removeProperty('background-image');
    }
  }
}

export function removeDarkMode() {
  const duelOsViewports = document.querySelectorAll('#duel .os_viewport');
  const textInputProxies = document.querySelectorAll('.textinput.proxy');
  const watchers = document.getElementById('watchers') as HTMLElement;
  const textInputElements = document.querySelectorAll('input[type="text"]');
  const previewText = document.getElementById('preview_txt') as HTMLElement;
  const actionList = document.getElementById('action_list');

  duelOsViewports.forEach((node) => node.classList.remove('dark-mode'));
  textInputProxies.forEach((node) => node.classList.remove('dark-mode'));
  watchers.classList.remove('dark-mode');
  textInputElements.forEach((node) => node.classList.remove('dark-mode'))
  previewText.classList.remove('dark-mode')
  actionList?.classList.remove('dark-mode');

  const onlineUsersOsViewports = document.querySelectorAll('#chats .os_viewport')
  const onlineUsersChatBackground = document.querySelectorAll('#chats .chat_background')

  onlineUsersOsViewports.forEach((node) => node.classList.remove('dark-mode'));
  onlineUsersChatBackground.forEach((node) => node.classList.remove('dark-mode'));

  const mainCssRules = document.styleSheets[0].cssRules
  for (let rule of mainCssRules) {
    let styleRule = rule as CSSStyleRule;
    if (styleRule.selectorText?.includes("cell1")) {
      styleRule.style.setProperty('background-image', "url(https://images.duelingbook.com/svg/cell_up.svg)");
    }
  }
}
