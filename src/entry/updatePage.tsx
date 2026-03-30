import React from "react";
import { createRoot } from "react-dom/client";
import { JoinDiscord, Footer, ErrorBoundary } from "../components";
import logo from "../assets/images/dbe_logo_64.png";
import { UPDATE_FEATURES } from "../data";

export const UpdatePage = () => {
  return (
    <div className="bg-white w-1/4 container mx-auto flex-col flex h-auto p-4 items-center rounded mt-6">
      <JoinDiscord />
      <div className="bg-gray-700 rounded flex w-full justify-center items-center text-white px-4 py-2 my-4">
        <img src={logo} alt="DuelingBookEnhanced Logo" />
        <h1 className="text-2xl">What&apos;s New</h1>
      </div>
      <p>Thank you for using DuelingBookEnhanced, here are some updates for 0.2.2: </p>
      <div className="my-6">
        {UPDATE_FEATURES.map((item, index) => (
          <li key={index} className="text-gray-600">
            {item.feature}
          </li>
        ))}
      </div>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <UpdatePage />
    </ErrorBoundary>
  </React.StrictMode>
);
