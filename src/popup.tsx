import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Button from './components/Button'
import './popup.css'

const Popup = () => {
  const [disableAllOptions, setDisableAllOptions] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [immediatelyGoToMainMenu, setImmediatelyGoToMainMenu] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const handleSettingsButtonClick = () => {
    // settings redirect... window.location.href, or react router?
  };

  // night mode logic - probably just styles to make the text white and background black
  // here's the spans and divs and stuff
  // card text left side: div w/ id "preview_txt"
  // chatbox: class="cout_txt textarea scrollpane selectable" (theres no id for it its cringe)
  // good color for night mode background: #242428
  const toggleNightMode = () => {
    console.log('youre clicking nightmode');
    const textBoxes = document.querySelectorAll(".os_viewport");
    console.log(textBoxes);
    textBoxes.forEach((textBox) => {
      if (textBox instanceof HTMLElement) {
        console.log('yay we dark mode now');
        textBox.style.backgroundColor = "#242428";
      }
    });
    setIsNightMode(!isNightMode);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Settings
      </h1>
      <div
        id="input_container"
        style={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="allOptions"
            type="checkbox"
            checked={disableAllOptions}
            onChange={() => setDisableAllOptions(!disableAllOptions)}
          />
          <label htmlFor="allOptions">Disable/Enable All Options</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="skipIntro"
            type="checkbox"
            checked={skipIntro}
            onChange={() => setSkipIntro(!skipIntro)}
          />
          <label htmlFor="skipIntro">Skip Intro</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="goToSettings"
            type="checkbox"
            checked={immediatelyGoToMainMenu}
            onChange={() => setImmediatelyGoToMainMenu(!immediatelyGoToMainMenu)}
          />
          <label htmlFor="goToSettings">Go to Settings</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="nightMode"
            type="checkbox"
            checked={isNightMode}
            onChange={toggleNightMode}
          />
          <label htmlFor="nightMode">Night Mode</label>
        </div>

        <div id="button-container">
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
