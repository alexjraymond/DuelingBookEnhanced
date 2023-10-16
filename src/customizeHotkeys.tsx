import React, { useState, useEffect } from 'react';
import defaultHotkeysData from './data/hotkeysConfig.json';
import { loadHotkeysConfig, getDefaultHotkeys, saveHotkeysConfig } from './utilities/configUtility';
import Button from './components/Button';



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

const defaultHotkeys = defaultHotkeysData.hotkeys;

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
    // initialize selectedHotkeys with default values
    const initialSelectedHotkeys: { [key: string]: string } = {};
    actions.forEach((action) => {
      const hotkey = findHotkeyByAction(action, defaultHotkeys);
      initialSelectedHotkeys[action] = hotkey;
    });
    setSelectedHotkeys(initialSelectedHotkeys);
  }, [actions]);

  const handleHotkeyChange = (action: string, hotkey: string) => {
    setSelectedHotkeys((prevSelectedHotkeys) => {
      const updatedSelectedHotkeys = { ...prevSelectedHotkeys, [action]: hotkey };
      console.log('Action:', action, 'Hotkey:', hotkey);
      return updatedSelectedHotkeys;
    });
  };

  function findHotkeyByAction(action: string, hotkeysConfig: Record<string, { action: string | string[] }>): string {
    for (const hotkey in hotkeysConfig) {
      const actions = hotkeysConfig[hotkey].action;
      const parts = action.split('/');

      if (Array.isArray(actions)) {
        if (actions.includes(parts[0]) || actions.includes(parts[1])) {
          return hotkey;
        }
      } else if (actions === parts[0] || actions === parts[1]) {
        return hotkey;
      }
    }
    return '';
  }

  return (
    <div className='container justify-center'>
      <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>{title}</h1>
      <div className='flex flex-col gap-2'>
        {actions.map((action, index) => {
          // find the corresponding hotkey for the action
          const hotkey = findHotkeyByAction(action, defaultHotkeys)

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
