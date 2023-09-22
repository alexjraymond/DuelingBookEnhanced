import React, { useState } from 'react';
import { hotkeys as initialHotkeys } from './data/hotkeysConfig.json';
import card from "../public/dbe_logo.png"

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

  const thisFunctionIsTheHtml = {

    
  }

  return (
    <div>
      <div className="flex justify-center">
      <img src={card} />
      <img src={card} />
      <img src={card} />
      <img src={card} />
      <img src={card} />
      </div>
        <div>
      <h1 className='text-2xl justify-center flex'>We set 5 cards face down and will be back with this section soon...</h1>
        </div>
    </div>
  );
};

export default CustomizeHotkeys;