import React from 'react'
import ReactDOM from 'react-dom'
import dbe_logo from '../public/dbe_logo.png'



export const NewFeatures = () => {
    const features: string[] = [
        '"To Exta Deck" and "To Hand" now share a hotkey ',
        'Added hotkey for "To Extra Deck FU" (Default "u") ',
        'Added hotkey for Banishing Top of Deck (no need to hover) (Default ",") ',
        'Added hotkey for Target (Default "r") ',
        'Added hotkey for Target (Default "r") ',
        'Thumbs Up can now be held to toggle'

    ]


  return (
    <div className="bg-gray-300 w-1/4 container mx-auto flex-col flex h-auto p-4 items-center">
      <div className='bg-gray-700 rounded flex w-full justify-center items-center text-white p-4'>
        <img src={dbe_logo} />
        <h1 className='text-2xl'>What's New</h1>
      </div>
    <p>  Thank you for using DuelingBookEnhanced, here are some updates for THISVERSION</p>
      <div>


      {features.map((feature, index) => (
        <li key={index} className='text-gray-600'>
          {feature}
        </li>
      ))}
            </div>
    </div>
  )
}



ReactDOM.render(
    <React.StrictMode>
      <NewFeatures />
    </React.StrictMode>,
    document.getElementById('root')
  );