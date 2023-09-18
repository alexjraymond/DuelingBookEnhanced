import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import logo from './assets/images/dbe_logo.png'
import yugiIcon from './assets/images/yugi-icon.png'
import './fullOptions.css';

const Options = () => {
  const [color, setColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        favoriteColor: "red",
        likesColor: true,
      },
      (items) => {
        setColor(items.favoriteColor);
        setLike(items.likesColor);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        favoriteColor: color,
        likesColor: like,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <div className="content-container">
      <div id="sidebar">
        <div className="fixed">
          <header>
            <div className="full-logo">
              <div className="logo-frame">
                <img
                  src={logo}
                  alt="DBE Logo" />
              </div>
              <h2>DuelingBook<span>Enhanced</span></h2>
            </div>
            <p className="settings-header">SETTINGS</p>
          </header>
          <nav>
            <div className="settings-tabs" role="tablist">
              <button role="presentation">
                General
              </button>
              <button role="presentation">
                Customize Hotkeys
              </button>
              <button role="presentation">
                Advanced
              </button>
              <button role="presentation">
                Help
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="main-content">
        <aside className="premium-banner-container">
          <div className="premium-upgrade banner foreground">
            <div className="premium-header">
              <div className="premium-icon-frame">
                <img src={yugiIcon} alt="yugi icon" />
              </div>
              <span className="premium-label" dir="ltr">Premium</span>
            </div>
            <p id="premium-upgrade-description" data-i18n="options_premium_upgrade_description">Customize and enhance your
              dueling experience! <a data-i18n-index="0"
                href="https://accounts.adblockplus.org/en_US/premium?an=adblockpluschrome&amp;av=3.19&amp;ap=chrome&amp;apv=116.0.0.0&amp;p=chromium&amp;pv=116.0.0.0&amp;s=desktop-options"
                target="_blank">Learn more</a></p>
            <button className="premium upgrade button">Upgrade</button>
          </div>
        </aside>
        <main>
          <h1 className="main-header">General</h1>
          <p>Determine how DuelingBookEnhanced can improve your experience</p>
          <hr />
          <div className="main-options">
            <label><input type="checkbox" />Enable DuelingBookEnhanced</label>
            <label><input type="checkbox" />Skip Intro</label>
            <label><input type="checkbox" />Auto-Connect (must be logged in!)</label>
            <label><input type="checkbox" />Night Mode</label>
          </div>
          <hr />
        </main>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
