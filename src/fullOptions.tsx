import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import logo from './assets/images/dbe_logo.png'
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
              <div className="logo-frame"><img src={logo} alt="DBE Logo" /></div>
              <h2>DuelingBook<span>Enhanced</span></h2>
            </div>
            <p data-i18n="options_page_title">Settings</p>
          </header>

          <nav>
            <ul className="tabs" role="tablist" data-action="switch-tab" data-keys="ArrowLeft ArrowUp ArrowRight ArrowDown">
              <li role="presentation">
                <a id="tab-general" href="#general" data-i18n="options_tab_general" role="tab" aria-controls="content-general" aria-selected="true">General</a>
              </li>
              <li role="presentation">
                <a id="tab-allowlist" href="#allowlist" data-i18n="options_tab_allowlist" role="tab"aria-controls="content-allowlist">Allowlisted websites</a>
              </li>
              <li role="presentation">
                <a id="tab-advanced" href="#advanced" data-i18n="options_tab_advanced" role="tab"aria-controls="content-advanced">Advanced</a>
              </li>
              <li role="presentation">
                <a id="tab-help" href="#help" data-i18n="options_tab_help" role="tab" aria-controls="content-help">Help</a>
              </li>
            </ul>
          </nav>

          <footer>
            <p>
              <a data-i18n="options_footer_contribute" className="button secondary" data-doclink="contribute" target="_blank" href="https://adblockplus.org/redirect?link=contribute&amp;lang=en-US">Contribute</a>
            </p>
            <p>
              <button data-i18n="options_footer_about" className="link" data-action="open-dialog" data-dialog="about">About Adblock Plus</button>
            </p>
          </footer>
        </div>
      </div>
      <div>
        <div>
          Favorite color: <select
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={like}
              onChange={(event) => setLike(event.target.checked)}
            />
            I like colors.
          </label>
          i like turtles
        </div>
        <div>{status}</div>
        <button onClick={saveOptions}>Save</button>
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
