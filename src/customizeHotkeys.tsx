import React, { useState } from 'react';
import defaultHotkeys from './data/hotkeysConfig.json';
import { loadHotkeysConfig } from './utilities/configUtility';

const validHotkeys = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Space', 'Tab', 'Shift', 'Ctrl', 'Alt',
  'AltGraph', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight',
  'Insert', 'Home', 'End', 'PageUp', 'PageDown',
  'Backslash', 'CapsLock',
  ',', '.', '/', ';', '\'', '[', ']',
];

type HotkeyConfig = {
  [key: string]: {
    action: string | string[];
  };
};

const HotkeySection: React.FC<{ title: string; actions: string[] }> = ({ title, actions }) => {

  console.log('default hotkeys', defaultHotkeys)

  const handleHotkeyChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
  };

  return (
    <div className='container justify-center'>
      <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>{title}</h1>
      <div className='flex flex-col gap-2'>
        {actions.map((action, index) => (
          <div key={index} className='flex gap-4'>
            <h2 className='inline'>{action}</h2>
            <select
              onChange={(event) => handleHotkeyChange(event, index)}
              className="border rounded-md text-gray-600"
            >
              {validHotkeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

const hotkeySections = [
  {
    title: 'View Actions',
    actions: ['View Graveyard', 'View Main Deck', 'View Extra Deck']
  },
  {
    title: 'Card Actions',
    actions: ["To Graveyard/To Grave", "To Hand", "Activate", "To S/T", "S. Summon ATK/SS ATK", "Normal Summon", "Set", "Declare", "Banish"]
  },
  {
    title: 'Emotes/Chat Box',
    actions: ["Think", "Thumbs Up", "Toggle Chat Box"]
  }
];

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
    </div>
  );
};

export default CustomizeHotkeys;
