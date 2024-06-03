import React, { createElement } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

export default function HotkeyForm() {
  const { register, handleSubmit } = useForm();
  const hotkeyOptions = generateHotkeyOptions();
  // Styling Strings.
  const h1Style = "text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4";
  return (
    <>
      <form>
        <h1 className={h1Style}>
          Deck Actions
        </h1>
        <label htmlFor='close-view-menu'>Close View Menu</label>
        <Select inputId='close-view-menu' options={hotkeyOptions} />
        <h1 className={h1Style}>
          Card Actions
        </h1>
        <h1 className={h1Style}>
          Milling
        </h1>
        <h1 className={h1Style}>
          LP Management
        </h1>
        <h1 className={h1Style}>
          Emotes & Chat Box
        </h1>
      </form>
    </>
  )
};

function generateHotkeyOptions() {
  let optionsArr: { value: string, label: string }[] = [];
  validHotkeys.forEach((key) => {
    optionsArr.push({
      value: key,
      label: key,
    })
  });
  return optionsArr;
};

const validHotkeys: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ',',
  '.',
  '/',
  ';',
  "'",
  '[',
  ']',
  '+',
  '-',
  'enter',
  'escape',
];
//type KeyOption = (typeof validHotkeys)[number];
