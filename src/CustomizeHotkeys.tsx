import React, { useState } from 'react';
import { HotkeySection } from './components/HotkeySection';
import { getDefaultHotkeys, saveHotkeysConfig } from './utilities/configUtility';
import { hotkeySections } from './data/hotkeySections';

interface CustomizeHotkeysTypes {
  toggleSavedMessage: () => void;
}

const CustomizeHotkeys: React.FC<CustomizeHotkeysTypes> = ({ toggleSavedMessage }) => {
  const [selectedHotkeys, setSelectedHotkeys] = useState<{ [key: string]: string }>({});
  const [resetCounter, setResetCounter] = useState(0); // dummy state to force HotkeySection re-render when clicking the reset defaults button

  const resetDefaults = async () => {
    const defaultHotkeys = getDefaultHotkeys();
    await saveHotkeysConfig(defaultHotkeys);
    setResetCounter(resetCounter + 1);
    toggleSavedMessage()
  };

  return (
    <div className="flex flex-col justify-center gap-2 mb-10">
      <h1 className="text-3xl font-bold">Customize Hotkeys</h1>
      {hotkeySections.map((section, index) => (
        <HotkeySection
          key={index}
          title={section.title}
          actions={section.actions}
          note={section.note}
          selectedHotkeys={selectedHotkeys}
          setSelectedHotkeys={setSelectedHotkeys}
          resetCounter={resetCounter}
          toggleSavedMessage={toggleSavedMessage}
        />
      ))}
      <hr />
      <div className="flex justify-center">
        <button
          onClick={resetDefaults}
          className="inline-block w-32 bg-blue-500 text-white text-sm cursor-pointer transition-transform duration-200 ease-in h-[40px] rounded px-3 py-2 hover:bg-blue-400"
        >
          Reset Defaults
        </button>
      </div>

    </div>
  );
};

export default CustomizeHotkeys;
