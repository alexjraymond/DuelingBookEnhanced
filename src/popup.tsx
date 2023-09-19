import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Button from './components/Button';
import './popup.css';
import logo from './assets/images/dbe_logo.png'
import cog from './assets/images/cog.png'

const Popup = () => {
  const [disableAllOptions, setDisableAllOptions] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [autoConnect, setAutoConnect] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const handleSettingsButtonClick = () => {
    chrome.runtime.openOptionsPage()
  };

  // night mode logic - probably just styles to make the text white and background black
  // card text left side: div w/ id "preview_txt"
  // chatbox: class="cout_txt textarea scrollpane selectable" (there's no id for it, it's cringe)
  // good color for night mode background: #242428
  // transfer logic through chrome.storage shenanigans

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
    setIsNightMode(!isNightMode);
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <div className="full-logo">
          <div className="logo-frame"><img src={logo} alt="DBE Logo" /></div>
          <h2>DuelingBook<span>Enhanced</span></h2>
        </div>
        <button id="settings-button" onClick={handleSettingsButtonClick}>
          <img src={cog} alt="settings" />
        </button>
      </div>
      <div id="input_container" className="input-container">
        <div className="checkbox-container">
          <input
            id="allOptions"
            className="checkbox-input"
            type="checkbox"
            checked={disableAllOptions}
            onChange={() => setDisableAllOptions(!disableAllOptions)}
          />
          <label className="checkbox-label" htmlFor="allOptions">Disable/Enable All Options</label>
        </div>

        <div className="checkbox-container">
          <input
            id="skipIntro"
            className="checkbox-input"
            type="checkbox"
            checked={skipIntro}
            onChange={() => setSkipIntro(!skipIntro)}
          />
          <label className="checkbox-label" htmlFor="skipIntro">Skip Intro</label>
        </div>

        <div className="checkbox-container">
          <input
            id="nightMode"
            className="checkbox-input"
            type="checkbox"
            checked={isNightMode}
            onChange={toggleNightMode}
          />
          <label className="checkbox-label" htmlFor="nightMode">Night Mode</label>
        </div>

        <div id="button-container" className="button-container">
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
