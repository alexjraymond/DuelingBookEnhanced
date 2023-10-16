import React, { useState, useEffect } from 'react';
import { loadHotkeysConfig, getDefaultHotkeys, saveHotkeysConfig } from './utilities/configUtility';

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

const HotkeySection: React.FC<{ title: string; actions: string[] }> = ({ title, actions }) => {
  const [selectedHotkeys, setSelectedHotkeys] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function loadAndLogHotkeys() {
      const currentHotkeys = await loadHotkeysConfig();
      console.log('current hotkeys', currentHotkeys);
    }
    loadAndLogHotkeys();
  }, []);

  useEffect(() => {
    async function initializeSelectedHotkeys() {
      try {
        const currentHotkeys = await loadHotkeysConfig();
        console.log('current hotkeys', currentHotkeys);

        // Initialize selectedHotkeys based on the currentHotkeys
        const initialSelectedHotkeys: { [key: string]: string } = {};
        actions.forEach((action) => {
          const hotkey = findHotkeyByAction(action, currentHotkeys);
          initialSelectedHotkeys[action] = hotkey;
        });

        // Set selectedHotkeys based on the loaded hotkeys
        setSelectedHotkeys(initialSelectedHotkeys);
      } catch (error) {
        console.error('Error loading hotkeys:', error);
      }
    }

    initializeSelectedHotkeys();
  }, [actions]);

  const handleHotkeyChange = async (action: string, hotkey: string) => {
    try {
      const currentHotkeys = await loadHotkeysConfig();
      const actionParts = action.split('/');
      const actions = [];

      if (actionParts.length > 1) {
        actions.push(...actionParts);
      } else {
        actions.push(action);
      }

      const updatedSelectedHotkeys = { ...selectedHotkeys };

      for (const hotkeyItem of currentHotkeys) {
        if (actions.includes(hotkeyItem.action)) {
          updatedSelectedHotkeys[hotkeyItem.action] = hotkeyItem.hotkey;
        }

        for (const hotkeyItem of currentHotkeys) {
          if (actions.includes(hotkeyItem.action)) {
            hotkeyItem.hotkey = hotkey;
          }
        }
      }
      console.log('current hotkeys updated', currentHotkeys)
      setSelectedHotkeys(updatedSelectedHotkeys);
      await saveHotkeysConfig(currentHotkeys);

    } catch (error) {
      console.error('Error loading or updating hotkeys:', error);
    }
  };

  type HotkeyEntry = {
    action: string | string[];
    hotkey: string;
  };

  function findHotkeyByAction(action: string, hotkeysConfig: HotkeyEntry[]): string {
    for (const hotkeyItem of hotkeysConfig) {
      const actions = hotkeyItem.action;

      if (Array.isArray(actions)) {
        if (actions.includes(action)) {
          return hotkeyItem.hotkey;
        }
      } else if (actions === action) {
        return hotkeyItem.hotkey;
      }
    }
    return '';
  }


  return (
    <div className='container justify-center'>
      <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>{title}</h1>
      <div className='flex flex-col gap-2'>
        {actions.map((action, index) => {

          return (
            <div key={index} className='flex gap-4'>
              <h2 className='inline'>{action}</h2>
              <select
                value={selectedHotkeys[action]}
                onChange={(e) => handleHotkeyChange(action, e.target.value)}
                className="border rounded-md text-gray-600"
              >
                {validHotkeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
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

const resetDefaults = async () => {
  const defaultHotkeys = getDefaultHotkeys();
  await saveHotkeysConfig(defaultHotkeys);
};

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
