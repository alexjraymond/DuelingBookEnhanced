import React from 'react'
import Button from './components/Button'
import HotkeysConfig from './data/hotkeysConfig.json'

const CustomizeHotkeys = () => {
  return (
    <>
    <h1 className="text-3xl font-bold">General</h1>
    <p className="text-gray-600 mt-2 mb-4">Determine how DuelingBookEnhanced can improve your experience</p>
    <hr className="border-gray-300 mb-4" />
    <div className="flex flex-col gap-4">
      {hotkeys.map((item) => (
        <div className="flex items-center" key={item.id}>
          <input
            id={item.id}
            type="text"
            className="mr-2"
          />
          <label className="flex items-center w-max" htmlFor={item.id}>{item.label}</label>
        </div>
      ))}
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
  </>
  )
}

const hotkeys = [
  {
    id: "g",
    label: "View Graveyard",
  },
  {
    id: "v",
    label: "View Deck",
  },
  {
    id: "e",
    label: "View Extra Deck",
  },
  {
    id: "d",
    label: "Declare Effect",
  },
];

export default CustomizeHotkeys