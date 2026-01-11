import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components";
import logo from "./assets/images/dbe_logo.png";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { getOptionsFromStorage, saveOptionsToStorage, OptionsTypes } from "./utilities";
import { URLS, DEFAULT_OPTIONS, createInputItems } from "./data";
import { Logger } from "./services";

const debug = new Logger("popup");

const Popup = () => {
  const [options, setOptions] = useState<OptionsTypes>(DEFAULT_OPTIONS);

  // Load options from storage when the popup is opened
  useEffect(() => {
    async function loadOptions() {
      try {
        const savedOptions = await getOptionsFromStorage();
        setOptions(savedOptions);
        debug.log("inside getoptionsfromstorage");
      } catch (error) {
        debug.error("Error loading options:", error);
      }
    }
    loadOptions();
  }, []);

  // Use useEffect to save options whenever they change
  useEffect(() => {
    async function saveOptions() {
      if (options) {
        try {
          await saveOptionsToStorage(options);
          debug.log("latest options", options);
        } catch (error) {
          debug.error("Error saving options:", error);
        }
      }
    }
    saveOptions();
  }, [options]);

  const handleSettingsButtonClick = () => {
    chrome.runtime.openOptionsPage();
  };

  const inputItems = createInputItems(options, setOptions);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center">
          <div className="w-12">
            <img src={logo} alt="DBE Logo" />
          </div>
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
        {inputItems.map((item, index) => (
          <div
            className={`flex items-center ${
              options.disableAllOptions && index > 0 ? "opacity-50" : ""
            }`}
            key={item.id}
          >
            <input
              id={item.id}
              type="checkbox"
              className={`w-4 h-4 border-2 border-blue-500 rounded-4 bg-transparent outline-none transition duration-300 ease-in text-white ${
                index > 0 && options.disableAllOptions ? "" : "cursor-pointer"
              }`}
              checked={item.checked}
              onChange={item.onChange}
              disabled={index > 0 && options.disableAllOptions}
            />
            <label
              className={`ml-5 ${index > 0 && options.disableAllOptions ? "" : "cursor-pointer"}`}
              htmlFor={item.id}
            >
              {item.label}
            </label>
          </div>
        ))}
        <div id="button-container" className="flex justify-around w-full">
          <Button buttonText="Bugs & Feedback" buttonUrl={URLS.FEEDBACK_FORM} />
          <Button buttonText="Open DB" buttonUrl={URLS.DUELING_BOOK} />
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
