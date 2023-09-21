// Inject a CSS file into the page
export function injectStylesheet(filename: string) {
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL(`css/${filename}`);
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export function applyDarkMode() {
  const osViewports = document.querySelectorAll('#duel .os_viewport');
  const textInputProxies = document.querySelectorAll('.textinput.proxy');
  const watchers = document.getElementById('watchers') as HTMLElement;
  const textInputElements = document.querySelectorAll('input[type="text"]');
  const previewText = document.getElementById('preview_txt') as HTMLElement;

  osViewports.forEach((node) => node.classList.add('dark-mode'));
  textInputProxies.forEach((node) => node.classList.add('dark-mode'));
  watchers.classList.add('dark-mode');
  textInputElements.forEach((node) => node.classList.add('dark-mode'))
  previewText.classList.add('dark-mode')
}

export function removeDarkMode() {
  const osViewports = document.querySelectorAll('#duel .os_viewport');
  const textInputProxies = document.querySelectorAll('.textinput.proxy');
  const watchers = document.getElementById('watchers') as HTMLElement;
  const textInputElements = document.querySelectorAll('input[type="text"]');
  const previewText = document.getElementById('preview_txt') as HTMLElement;

  osViewports.forEach((node) => node.classList.remove('dark-mode'));
  textInputProxies.forEach((node) => node.classList.remove('dark-mode'));
  watchers.classList.remove('dark-mode');
  textInputElements.forEach((node) => node.classList.remove('dark-mode'))
  previewText.classList.remove('dark-mode')
}
