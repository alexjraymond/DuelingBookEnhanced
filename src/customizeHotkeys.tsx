import React, { useState } from 'react';
import { hotkeys as initialHotkeys } from './data/hotkeysConfig.json';

type HotkeyConfig = {
  [key: string]: {
    div: string | null;
    action: string | string[];
  };
};

const CustomizeHotkeys: React.FC = () => {
  const [hotkeySettings, setHotkeySettings] = useState<HotkeyConfig>(initialHotkeys);

  const handleHotkeyChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newHotkey = event.target.value;
    setHotkeySettings((prevSettings) => ({
      ...prevSettings,
      [key]: {
        ...prevSettings[key],
        action: newHotkey,
      },
    }));
  };

  return (
    <div>
      <h1 className='text-2xl'>COMING SOOOOOOOON</h1>
      {Object.entries(hotkeySettings).map(([key, config]) => (
        <div key={key}>
          <label htmlFor={`hotkey_${key}`}>{typeof config.action === 'string' ? config.action : config.action.join(', ')}</label>
          <input
            id={`hotkey_${key}`}
            value={key}
            onChange={(e) => handleHotkeyChange(key, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomizeHotkeys;