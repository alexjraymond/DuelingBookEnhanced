import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import logo from "../../media/dbe_logo.png";
import optionsStorage from "../options-storage.js";
import styled from "styled-components";

export function Popup() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function fetchOptions() {
      const options = await optionsStorage.getAll();
      //console.log(options);
      setOptions(options);
    }
    fetchOptions();
  }, []);

  return (
    <PopupWrapper>
      <TitleWrapper>
        <img src={logo} alt="DBE Logo" />
        <Title>
          DuelingBook<div>Enhanced</div>
        </Title>
        <HiOutlineCog8Tooth
          size={"3rem"}
          onClick={() => chrome.runtime.openOptionsPage()}
        />
      </TitleWrapper>
      <hr
        style={{
          width: "95%",
        }}
      />
      <FormWrapper>
        <label>
          <input
            type="checkbox"
            checked={options?.disableExtension || false}
            value={options?.disableExtension || false}
            onChange={function (e) {
              optionsStorage.set({
                ...options,
                disableExtension: e.target.checked,
              });
              setOptions({ ...options, disableExtension: e.target.checked });
            }}
          />
          Disable All Options
        </label>
        <label>
          <input
            type="checkbox"
            checked={options?.disableHotkeys || false}
            value={options?.disableHotkeys || false}
            onChange={function (e) {
              optionsStorage.set({
                ...options,
                disableHotkeys: e.target.checked,
              });
              setOptions({ ...options, disableHotkeys: e.target.checked });
            }}
          />
          Disable Hotkeys
        </label>
        <label>
          <input
            type="checkbox"
            checked={options?.skipIntro || false}
            value={options?.skipIntro || false}
            onChange={function (e) {
              optionsStorage.set({
                ...options,
                skipIntro: e.target.checked,
              });
              setOptions({ ...options, skipIntro: e.target.checked });
            }}
          />
          Skip Intro
        </label>
        <label>
          <input
            type="checkbox"
            checked={options?.autoConnect || false}
            value={options?.autoConnect || false}
            onChange={function (e) {
              optionsStorage.set({
                ...options,
                autoConnect: e.target.checked,
              });
              setOptions({ ...options, autoConnect: e.target.checked });
            }}
          />
          Auto-Connect
        </label>
        <label>
          <input
            type="checkbox"
            checked={options?.darkMode || false}
            value={options?.darkMode || false}
            onChange={function (e) {
              optionsStorage.set({
                ...options,
                darkMode: e.target.checked,
              });
              setOptions({ ...options, darkMode: e.target.checked });
            }}
          />
          Dark Mode
        </label>
      </FormWrapper>
    </PopupWrapper>
  );
}

const container = document.getElementById("dbe-popup");
const root = createRoot(container);
root.render(<Popup />);

const PopupWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  > img {
    width: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-style: normal;
  > div {
    display: inline;
    font-weight: bold;
  }
`;

const FormWrapper = styled.form`
  display: inline-grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  > label {
    display: flex;
  }
`;
