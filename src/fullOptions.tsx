import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Button from "./components/Button";
import logo from "./assets/images/dbe_logo.png";
import coffee from "./assets/images/coffee.png";
import yugiIcon from "./assets/images/yugi-icon.png";
import { BsDiscord } from 'react-icons/Bs'

const Options = () => {
  const [color, setColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
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
    chrome.storage.sync.set(
      {
        favoriteColor: color,
        likesColor: like,
      },
      () => {
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <div className="container mx-auto flex items-start h-screen p-4">
      <div className="flex flex-col bg-gray-300 rounded-lg shadow-lg md:w-3/4 lg:w-1/5">
        <div className="flex items-center mb-4 bg-gray-700">
          <img src={logo} alt="DBE Logo" className="w-16 h-16" />
          <h2 className="text-2xl font-bold text-white">DuelingBook<span className="text-gray-500">Enhanced</span></h2>
        </div>
        <p className="text-xl font-semibold mt-4">SETTINGS</p>
        <nav className="mt-4">
          <button className="bg-gray-700 w-full py-2 mb-2">General</button>
          <button className="bg-gray-700 w-full py-2 mb-2">Customize Hotkeys</button>
          <button className="bg-gray-700 w-full py-2 mb-2">Advanced</button>
          <button className="bg-gray-700 w-full py-2 mb-2">Help</button>
        </nav>
      </div>
      <div className="flex-grow p-4">
        <aside className="bg-gray-700 text-white p-4 mb-4 rounded-lg flex justify-center items-center align-middle text-lg space-x-4">
          <div className="flex items-center ">
            <img src={yugiIcon} alt="yugi icon" className="w-10 h-10 justify-center mb-2" />
          </div>
          <p className="">
            Join our Discord!
          </p>
          <button className="bg-blue-500 p-2 font-bold flex justify-center items-center"><BsDiscord className="w-8 h-8 flex" /></button>
        </aside>

        <main>
          <h1 className="text-3xl font-bold">General</h1>
          <p className="text-gray-600 mt-2 mb-4">Determine how DuelingBookEnhanced can improve your experience</p>
          <hr className="border-gray-300 mb-4" />
          <div className="space-y-4">
            <label className="flex items-center"><input type="checkbox" className="mr-2" />Enable DuelingBookEnhanced</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />Skip Intro</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />Auto-Connect (must be logged in!)</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />Night Mode</label>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-evenly items-center">
            <div className="flex items-center">
              <span className="mr-2">Noticed a bug or want to request a feature? Let us know!</span>
              <Button buttonText="Bugs & Feedback" buttonUrl="https://forms.gle/yLW8pasvEr2rshSQ9" />
            </div>
            <div className="flex items-center">
              <span className="mr-2">Ready to play? It's time to duel!</span>
              <Button buttonText="Open DB" buttonUrl="http://www.DuelingBook.com/html5" />
            </div>
          </div>
        </main>

        <footer className="mt-8">
          <div className="bg-gray-700 text-white p-4 flex items-center">
            <img src={coffee} alt="coffee" className="w-8 h-8 mr-2" />
            <div className="flex-grow">
              <span className="font-bold">Enjoying our Product?</span>
              <span> Share some support</span>
            </div>
            <button className="bg-gray-600 p-2">Buy Us Coffee</button>
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