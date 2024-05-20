import React, { useState, useEffect } from "react";
import { HotkeySetting } from "../data/hotkeySections";
import { loadHotkeysConfig } from "../utils/configUtility";

export default function HotkeySettings() {
  const [hotkeys, setHotkeys] = useState<HotkeySetting>();

  // Loads and stores the hotkey settings on mount.
  useEffect(() => {
    async function getHotkeyData() {
      const hotkeyData = await loadHotkeysConfig();
      //setHotkeys(hotkeyData);
    }

    getHotkeyData();
  }, [hotkeys])

  return (
    <>
      Hello World!
    </>
  );
}
