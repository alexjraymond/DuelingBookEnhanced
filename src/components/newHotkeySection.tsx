import React, { useState, useEffect, FormEvent } from "react";
import { Hotkey } from "../data/hotkeySections";
import { loadHotkeysConfig, saveHotkeysConfig } from "../utils/configUtility";

export default function HotkeySettings() {
  const [hotkeys, setHotkeys] = useState<Hotkey>();

  // Loads and stores the hotkey settings.
  useEffect(() => {
    async function getHotkeyData() {
      const hotkeyData = await loadHotkeysConfig();
      //setHotkeys(hotkeyData);
    }
    getHotkeyData();
  }, [hotkeys]);

  return (
    <div>
      <form
      >
      </form>
      Hello World!
    </div>
  );
}
