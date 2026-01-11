import React from "react";
import { createRoot } from "react-dom/client";
import { JoinDiscord, Footer } from "./components";
import logo from "./assets/images/dbe_logo_64.png";

export const NewFeatures = () => {
  const features: string[] = [
    '"To Extra Deck" and "To Hand" now share a hotkey ',
    'Added hotkey for "To Extra Deck FU" (Default "u") ',
    'Added hotkey for Banishing Top of Deck (no need to hover) (Default "m") ',
    'Added hotkey for Target (Default "r") ',
    "Removed various buggy hotkeys such as tab, shift, ctrl, arrow keys, etc ",
    "This page that you are now seeing! ",
  ];

  return (
    <div className="bg-white w-1/4 container mx-auto flex-col flex h-auto p-4 items-center rounded mt-6">
      <JoinDiscord />
      <div className="bg-gray-700 rounded flex w-full justify-center items-center text-white px-4 py-2 my-4">
        <img src={logo} alt="DuelingBookEnhanced Logo" />
        <h1 className="text-2xl">What&apos;s New</h1>
      </div>
      <p>Thank you for using DuelingBookEnhanced, here are some updates for 0.2.2: </p>
      <div className="my-6">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600">
            {feature}
          </li>
        ))}
      </div>

      <Footer />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <NewFeatures />
  </React.StrictMode>
);
