import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Button  from './components/Button'
import logo from './assets/images/dbe_logo.png'
import coffee from './assets/images/coffee.png'
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
            <div className="settings-tabs">
              <button>
                General
              </button>
              <button>
                Customize Hotkeys
              </button>
              <button>
                Advanced
              </button>
              <button>
                Help
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="main-content">

        <aside className="premium-banner-container">
          <div className="banner">
            <div className="premium-header">
              <div className="icon-frame">
                <img src={yugiIcon} alt="yugi icon" />
              </div>
              <span className="premium-label" dir="ltr">Premium</span>
            </div>
            <p>
              Customize and enhance your dueling experience!&nbsp;
              <a
                href="#"
                target="_blank"
              >
                Learn more&nbsp;
              </a>
            </p>
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
          <div className="main-footer">
            <div className="main-footer-link">
              <div className="main-footer-message">
                <span>Noticed a bug or want to request a feature? Let us know! </span>
              </div>
              <Button buttonText='Bugs & Feedback' buttonUrl='https://forms.gle/yLW8pasvEr2rshSQ9' />
            </div>
            <div className="main-footer-link">
              <div className="main-footer-message">
                <span>Ready to play? It's time to duel!</span>
              </div>
              <Button buttonText={'Open DB'} buttonUrl='http://www.DuelingBook.com/html5' />
            </div>
          </div>
        </main>

        <footer>
          <div className="banner">
            <div className="footer-header">
              <div className="icon-frame">
                <img src={coffee} alt="coffee" />
              </div>
              <div className="footer-label">
                <span className="bold">Enjoying our Product? </span>
                <span>Share some support </span>
              </div>
              <button className="footer-coffee">Buy Us Coffee</button>
            </div>
          </div>
        </footer>
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
