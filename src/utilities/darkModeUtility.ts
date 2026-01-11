// Inject a CSS file into the page
export function injectStylesheet(filename: string) {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL(`css/${filename}`);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const DARK_MODE_CLASS = "dark-mode";

const DARK_MODE_SELECTORS = [
  "#duel .os_viewport",
  ".textinput.proxy",
  'input[type="text"]',
  "#chats .os_viewport",
  "#chats .chat_background",
];

const DARK_MODE_IDS = ["watchers", "preview_txt"];

function toggleDarkMode(apply: boolean) {
  const action: "add" | "remove" = apply ? "add" : "remove";

  DARK_MODE_SELECTORS.forEach((selector) => {
    document
      .querySelectorAll<HTMLElement>(selector)
      .forEach((node) => node.classList[action](DARK_MODE_CLASS));
  });

  DARK_MODE_IDS.forEach((id) => {
    const element = document.getElementById(id);
    element?.classList[action](DARK_MODE_CLASS);
  });
}

export function applyDarkMode() {
  toggleDarkMode(true);
}

export function removeDarkMode() {
  toggleDarkMode(false);
}
