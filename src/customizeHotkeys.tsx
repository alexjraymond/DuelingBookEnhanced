import React, { useState } from 'react';
import initialHotkeys from './data/hotkeysConfig.json';

type HotkeyConfig = {
  [key: string]: {
    div: string | null;
    action: string | string[];
  };
};

const HotkeySection: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='container justify-center'>
      <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg'>{title}</h1>
    </div>
  );
};

const hotkeySectionNames = [
  'View Actions', 'Card Actions', 'User Interface', 'Emotes/Chat Box'
]

const CustomizeHotkeys: React.FC = () => {
  const [hotkeySettings, setHotkeySettings] = useState<HotkeyConfig>(initialHotkeys.hotkeys);

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
    <div className="flex flex-col justify-center gap-6 mb-10">
      <h1 className="text-3xl font-bold">Customize Your Hotkeys</h1>
      {hotkeySectionNames.map((sectionName, index) => (
        <HotkeySection key={index} title={sectionName} />
      ))}
    </div>
  );
};

export default CustomizeHotkeys;
