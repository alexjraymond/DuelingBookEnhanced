/**
 * Playing around with the idea of changing the text colors in the duel log, for better contrast.
 * 
 * The duel log creates a new font element and throws it in the DOM when a new action happens, 
 * so this is the kinda shit we need to do to modify everything lol.
**/
export function replayTest() {
  if (document.URL.includes("replay")) {
    const duelLog = document.getElementById("duel_log");
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    }

    const callbackFn = (mutationList: MutationRecord[], observer: MutationObserver) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");

          mutation.addedNodes.forEach((node: Node) => {
            let element = node as HTMLFontElement;
            if (node.nodeName === "FONT" && element.color === "#0000FF") {
              element.color = "#03fcec";
            }
          })

        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    };

    const observer = new MutationObserver(callbackFn);
    observer.observe(duelLog as Node, config);
  }
}