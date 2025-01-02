import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { hotkeyStorage } from "./options-storage";
import { actionDisplayNames } from "./utils";

export function Options() {
  const [isLoading, setIsLoading] = useState(true);
  const [hotkeyConfig, setHotkeyConfig] = useState(null);
  useEffect(() => {
    async function fetchHotkeys() {
      const hotkeys = await hotkeyStorage.getAll();
      setHotkeyConfig(hotkeys);
      setIsLoading(false);
    }
    fetchHotkeys();
  }, []);

  const [list, setList] = useState(null);
  useEffect(() => {
    if (!isLoading) {
      const localList = Array.from(actionDisplayNames).map(([key, val]) => {
        return (
          <KeybindEntry id={key} key={key} onClick={setKeybind}>
            {val} | {hotkeyConfig[key]}
          </KeybindEntry>
        );
      });
      setList(localList);
    }
  }, [hotkeyConfig, isLoading]);

  let keybind = "";
  let actionId = "";
  function setKeybind(e) {
    actionId = e.target.id;
    setHotkeyConfig({ ...hotkeyConfig, [actionId]: "Setting keybind..." });
    document.addEventListener("keydown", recordKeybind);
  }

  function recordKeybind(e) {
    e.preventDefault();
    switch (e.key) {
      case "Escape":
        if (keybind.endsWith("+")) {
          keybind = keybind.substring(0, keybind.length - 1);
        } else if (keybind === "") {
          keybind = "Not Set";
        }
        setHotkeyConfig({ ...hotkeyConfig, [actionId]: keybind });
        document.removeEventListener("keydown", recordKeybind);
        hotkeyStorage.set({ [actionId]: keybind });
        keybind = "";
        break;
      case "Meta":
        alert("This key is unsupported. Please try again.");
        setHotkeyConfig({
          ...hotkeyConfig,
          [actionId]: hotkeyConfig[actionId],
        });
        document.removeEventListener("keydown", recordKeybind);
        break;
      default:
        console.log(e.key);
        keybind += `${e.key}+`;
        break;
    }
  }

  return (
    !isLoading && (
      <OptionsWrapper>
        <h1>Customize Hotkeys</h1>
        <h2>
          Click on a box to begin recording your desired keybind, and press
          Escape to save it.
        </h2>
        {list}
      </OptionsWrapper>
    )
  );
}

const container = document.getElementById("dbe-options");
const root = createRoot(container);
root.render(<Options />);

const OptionsWrapper = styled.div`
  height: 500px;
  font-family: "Dejavu Sans";
`;

const KeybindEntry = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  height: 25px;
  border: 3px solid black;
  padding: 0 5px;
  margin: 10px 0;
`;
