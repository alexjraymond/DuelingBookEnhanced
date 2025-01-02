import { hotkeyStorage } from "./options-storage.js";
import hotkeys from "hotkeys-js";

console.log("💈 Content script loaded for", chrome.runtime.getManifest().name);

// NOTE: Add some denounce state here or something.
export async function loadHotkeys() {
  const hotkeyConfig = await hotkeyStorage.getAll();
  hotkeys(hotkeyConfig.toggleDeckView, function (e) {
    e.preventDefault();
    handleDeckView("Main");
  });

  hotkeys("Escape", function (e) {
    e.preventDefault();
    closeViewMenu();
  });
}

function closeViewMenu() {
  console.log("Closing");
  document
    .getElementById("view")
    ?.getElementsByClassName("exit_btn")[0]
    ?.click();
}

function handleDeckView(deckType) {
  let deck = document.getElementById("deck_hidden");
  const mouseOverEvent = new MouseEvent("mouseover", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  if (deckType === "Main") {
    deck?.dispatchEvent(mouseOverEvent);
  } else if (deckType === "Extra") {
    extraDeck?.dispatchEvent(mouseOverEvent);
  }

  deckMenu = document.getElementById("card_menu_content");
  deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[0];
  deckViewSpan = deckViewButton?.getElementsByTagName("span")[0];

  if (deckViewSpan && deckViewSpan.textContent === "View") {
    deckViewSpan.click();
  } else if (deckViewSpan && deckViewSpan.textContent === "Show") {
    deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[1];
    deckViewSpan = deckViewButton?.getElementsByTagName("span")[0];
    deckViewSpan.click();
  } else {
    closeViewMenu();
  }
}

async function init() {
  console.log("init called");
  await loadHotkeys();
  console.log("Loaded!");
}

hotkeyStorage.onChanged(async () => {
  await loadHotkeys();
  console.log("Hotkeys Updated");
});

init();
