import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Button from './components/Button';
import logo from './assets/images/dbe_logo.png'
import { HiOutlineCog8Tooth } from 'react-icons/hi2'

const Popup = () => {
  const [options, setOptions] = useState({
    disableAllOptions: false,
    skipIntro: false,
    autoConnect: false,
    isNightMode: false,
  });

  const handleSettingsButtonClick = () => {
    chrome.runtime.openOptionsPage()
  };

  const toggleNightMode = () => {
    console.log('youre clicking nightmode');
    const textBoxes = document.querySelectorAll(".os_viewport");
    console.log('heres how many textboxes we got', textBoxes)
    console.log(textBoxes);
    textBoxes.forEach((textBox) => {
      if (textBox instanceof HTMLElement) {
        console.log('yay we dark mode now');
        textBox.classList.toggle("night-mode"); // Toggle night mode class
      }
    });
    setOptions({ ...options, isNightMode: !options.isNightMode });
  };

  const inputItems = [
    {
      id: "allOptions",
      label: "Disable/Enable All Options",
      checked: options.disableAllOptions,
      onChange: () => setOptions({ ...options, disableAllOptions: !options.disableAllOptions }),
    },
    {
      id: "skipIntro",
      label: "Skip Intro",
      checked: options.skipIntro,
      onChange: () => setOptions({ ...options, skipIntro: !options.skipIntro }),
    },
    {
      id: "autoConnect",
      label: "Auto-Connect (must be logged in!)",
      checked: options.autoConnect,
      onChange: () => setOptions({ ...options, autoConnect: !options.autoConnect }),
    },
    {
      id: "nightMode",
      label: "Night Mode",
      checked: options.isNightMode,
      onChange: toggleNightMode,
    },
  ];


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center">
          <div className="w-12"><img src={logo} alt="DBE Logo" /></div>
          <h2 className="font-normal text-xl">
            DuelingBook<span className="font-bold">Enhanced</span>
          </h2>
        </div>
        <button
          id="settings-button"
          className="group bg-transparent border-none cursor-pointer hover:bg-transparent hover:shadow-none p-0 flex justify-center items-center min-w-0"
          onClick={handleSettingsButtonClick}
        >
          <HiOutlineCog8Tooth className="w-9 h-9 group-hover:text-blue-400" />
        </button>
      </div>
      <div id="input_container" className="p-5 flex flex-col gap-4">
        {inputItems.map((item) => (
          <div className="flex items-center" key={item.id}>
            <input
              id={item.id}
              type="checkbox"
              className="w-4 h-4 border-2 border-blue-500 rounded-4 bg-transparent outline-none cursor-pointer transition duration-300 ease-in text-white"
              checked={item.checked}
              onChange={item.onChange}
            />
            <label className="ml-5" htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
        <div id="button-container" className="flex justify-around w-full">
          <Button buttonText='Bugs & Feedback' buttonUrl='https://forms.gle/yLW8pasvEr2rshSQ9' />
          <Button buttonText={'Open DB'} buttonUrl='http://www.DuelingBook.com/html5' />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
