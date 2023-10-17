import React, { useEffect, useState } from "react";
import { loadHotkeysConfig, saveHotkeysConfig } from "../utilities/configUtility";
import { validHotkeys } from "../data/validHotkeys";

interface HotkeySectionProps {
  title: string;
  actions: string[];
  selectedHotkeys: { [key: string]: string };
  setSelectedHotkeys: (hotkeys: { [key: string]: string }) => void;
}

export const HotkeySection: React.FC<HotkeySectionProps> = ({ title, actions, selectedHotkeys, setSelectedHotkeys }) => {

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

        const initialSelectedHotkeys: { [key: string]: string } = {};
        actions.forEach((action) => {
          const hotkey = findHotkeyByAction(action, currentHotkeys);
          initialSelectedHotkeys[action] = hotkey;
        });

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

  useEffect(() => {
    console.log('selected hotkeys changed', selectedHotkeys)
  }, [selectedHotkeys])


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
