import React from 'react';
import { HotkeySection } from './components/HotkeySection';
import { resetDefaults } from './utilities/configUtility';
import { hotkeySections } from './data/hotkeySections';

const CustomizeHotkeys: React.FC = () => {

  return (
    <div className="flex flex-col justify-center gap-6 mb-10">
      <h1 className="text-3xl font-bold">Customize Hotkeys</h1>
      {hotkeySections.map((section, index) => (
        <HotkeySection
          key={index}
          title={section.title}
          actions={section.actions}
        />
      ))}
      <hr />
      <div className="flex justify-center">
        <button
          onClick={resetDefaults}
          className="inline-block w-28 bg-blue-500 text-white text-sm cursor-pointer transition-transform duration-200 ease-in h-[40px] rounded px-3 py-2 hover:bg-blue-400"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  );
};

export default CustomizeHotkeys;
