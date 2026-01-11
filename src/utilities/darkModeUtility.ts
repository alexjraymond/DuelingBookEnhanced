/**
 * Injects a CSS stylesheet file into the page.
 * Uses Chrome's runtime API to get the correct extension URL for the CSS file.
 *
 * @param filename - The CSS filename to inject (e.g., "dark-mode.css")
 */
export function injectStylesheet(filename: string) {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL(`css/${filename}`);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

/** CSS class name applied to elements when dark mode is enabled */
const DARK_MODE_CLASS = "dark-mode";

/**
 * CSS selectors for elements that should receive dark mode styling.
 * These selectors target various UI elements on the DuelingBook page.
 */
const DARK_MODE_SELECTORS = [
  "#duel .os_viewport",
  ".textinput.proxy",
  'input[type="text"]',
  "#chats .os_viewport",
  "#chats .chat_background",
];

/**
 * Element IDs that should receive dark mode styling.
 * These are specific elements that need to be targeted by ID rather than selector.
 */
const DARK_MODE_IDS = ["watchers", "preview_txt"];

/**
 * Internal helper function to toggle dark mode class on DOM elements.
 * Applies or removes the dark mode class from all configured selectors and IDs.
 *
 * @param apply - Whether to apply (true) or remove (false) dark mode styling
 */
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
