function polling() {
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install" || details.reason === "update") {
    chrome.tabs.create({ url: 'newFeatures.html' })
  }

})

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "EXECUTE_BACKWARD" && sender.tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id, allFrames: true },
      world: "MAIN",
      func: () => {
        const fn =
          (window as any).stepBackwardE ||
          (window as any)._stepBackwardE;
        if (typeof fn === "function") {
          console.debug(
            "DuelingBookEnhanced: calling stepBackwardE from MAIN world"
          );
          fn();
        } else {
          console.warn(
            "DuelingBookEnhanced: stepBackwardE not found in this frame's MAIN world"
          );
        }
      }
    } as any);
  }
});

