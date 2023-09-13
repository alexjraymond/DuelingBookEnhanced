import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [disableAllOptions, setDisableAllOptions] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [immediatelyGoToMainMenu, setImmediatelyGoToMainMenu] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const handleFeedbackLinkClick = () => {
    // google form feedback logic... window.open?
  };

  const handleSettingsButtonClick = () => {
    // settings redirect... window.location.href, or react router?
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    // night mode logic - probably just styles to make the text white and background black
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#FFA987',
          color: '#1E1E24',
          marginTop: 0,
          marginBottom: 0
        }}
      
      >Settings</h1>
      <div 
      id="input_container"
      style={{
        padding: 5,
        display: 'grid',
        justifyItems: 'start',
        gap: 10,
        
      }}
      >
      <label>
        <input
          type="checkbox"
          checked={disableAllOptions}
          onChange={() => setDisableAllOptions(!disableAllOptions)}
        />
        Disable/Enable All Options
      </label>

      <label>
        <input
          type="checkbox"
          checked={skipIntro}
          onChange={() => setSkipIntro(!skipIntro)}
        />
        Skip Intro
      </label>

      <label>
        <input
          type="checkbox"
          checked={immediatelyGoToMainMenu}
          onChange={() => setImmediatelyGoToMainMenu(!immediatelyGoToMainMenu)}

        />
        Go to Settings
      </label>

      <label>
        <input
          type="checkbox"
          checked={isNightMode}
          onChange={toggleNightMode}
        />
        Night Mode
      </label>
      <div id= "button-container">
        <button onClick={handleFeedbackLinkClick}>Provide Feedback</button>
        <button onClick={handleSettingsButtonClick}>Go to All Settings</button>
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
