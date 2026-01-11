import React, { useEffect, useState, useRef } from "react";
import { Button, ComingSoon, JoinDiscord, Footer } from "../components";
import logo from "../assets/images/dbe_logo.png";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { getOptionsFromStorage, saveOptionsToStorage, OptionsTypes } from "../utilities";
import { URLS, DEFAULT_OPTIONS, createInputItems, OPTIONS_SECTIONS, SectionId } from "../data";
import CustomizeHotkeys from "./CustomizeHotkeys";
import KnownIssues from "./KnownIssues";
import { Logger } from "../services";

const debug = new Logger("OptionsPage");

interface OptionsPageProps {
  mode?: "popup" | "full";
}

export const OptionsPage: React.FC<OptionsPageProps> = ({ mode = "full" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSmall, setIsSmall] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionId>("General");
  const [isSavedVisible, setIsSavedVisible] = useState(false);
  const [options, setOptions] = useState<OptionsTypes>(DEFAULT_OPTIONS);

  // load options from storage when the popup is opened
  useEffect(() => {
    async function loadOptions() {
      try {
        const savedOptions = await getOptionsFromStorage();
        setOptions(savedOptions);
      } catch (error) {
        debug.error("Error loading options:", error);
      }
    }
    loadOptions();
  }, []);

  // save options whenever they change
  useEffect(() => {
    async function saveOptions() {
      try {
        await saveOptionsToStorage(options);
      } catch (error) {
        debug.error("Error saving options:", error);
      }
    }
    saveOptions();
  }, [options]);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 260) {
          setIsSmall(true);
        } else {
          setIsSmall(false);
        }
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settingsSavedMessageTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleSavedMessage = () => {
    setIsSavedVisible(false);
    if (settingsSavedMessageTimer.current) clearTimeout(settingsSavedMessageTimer.current);

    settingsSavedMessageTimer.current = setTimeout(() => {
      setIsSavedVisible(true);
    }, 1);
  };

  const inputItems = createInputItems(options, setOptions);

  const renderMainContent = () => {
    switch (currentSection) {
      case "General":
        return (
          <>
            <h1 className="text-3xl font-bold">General</h1>
            <p className="text-gray-600 mt-2">
              Determine how DuelingBookEnhanced can improve your experience
            </p>
            <hr className="border-gray-300 mb-4" />
            <div className="flex flex-col gap-4">
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
                    className={`mr-2 ${
                      index > 0 && options.disableAllOptions ? "" : "cursor-pointer"
                    }`}
                    checked={item.checked}
                    onChange={() => {
                      item.onChange();
                      toggleSavedMessage();
                    }}
                    disabled={index > 0 && options.disableAllOptions}
                  />
                  <label
                    className={`flex items-center w-max ${
                      index > 0 && options.disableAllOptions ? "" : "cursor-pointer"
                    }`}
                    htmlFor={item.id}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-evenly items-center">
              <div className="flex items-center">
                <span className="mr-2">
                  Noticed a bug or want to request a feature? Let us know!
                </span>
                <Button buttonText="Bugs & Feedback" buttonUrl={URLS.FEEDBACK_FORM} />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Ready to play? It&apos;s time to duel!</span>
                <Button buttonText="Open DB" buttonUrl={URLS.DUELING_BOOK} />
              </div>
            </div>
          </>
        );
      case "Customize Hotkeys":
        return <CustomizeHotkeys toggleSavedMessage={toggleSavedMessage} />;
      case "Advanced":
        return <ComingSoon />;
      case "Help":
        return <KnownIssues />;
      default:
        return null;
    }
  };

  // Popup mode: simplified view (just General section)
  if (mode === "popup") {
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
            onClick={() => chrome.runtime.openOptionsPage()}
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
  }

  // Full mode: full options page with navigation
  return (
    <div className="container mx-auto flex items-stretch h-auto p-4">
      <div className="flex flex-col bg-gray-300 rounded-lg shadow-lg mb-8">
        <div ref={containerRef} className="flex items-center mb-4 bg-gray-700 justify-center p-2">
          <img src={logo} alt="DBE Logo" className="w-12 h-12" />
          <h2 className="text-xl font-bold text-white">
            {isSmall ? "DB" : "DuelingBook"}
            <span className="text-gray-400">{isSmall ? "E" : "Enhanced"}</span>
          </h2>
        </div>
        <p className="text-xl font-semibold text-center">SETTINGS</p>
        <nav className="mt-4 text-white">
          {OPTIONS_SECTIONS.map((section) => (
            <button
              key={section.id}
              className="bg-gray-700 hover:bg-gray-500 w-full py-2 mb-2"
              onClick={() => setCurrentSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-grow p-4 pt-0 rounded-lg">
        <JoinDiscord />
        <main className="relative">
          {renderMainContent()}
          {isSavedVisible && (
            <div className="flex justify-center">
              <div className="saved-settings-message bg-green-500 text-white px-4 py-2 rounded-md absolute top-0 animate-slide-down opacity-0 text-lg transition-transform duration-500">
                Settings Saved!
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};
