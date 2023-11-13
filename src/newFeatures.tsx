import React from 'react'
import ReactDOM from 'react-dom'
import dbe_logo from '../public/dbe_logo.png'

export const NewFeatures = () => {
    const featuresList = [
        'new feature1',
        'newfeature2'
    ]


  return (
    <div className="w-1/4 container mx-auto flex flex-col h-auto p-4 items-center">
        <img src={dbe_logo} />
        <h1 className='text-xl'>What's New</h1>

      <p>  Thank you for using DuelingBookEnhanced, here are some updates for THISVERSION</p>




    </div>
  )
}



ReactDOM.render(
    <React.StrictMode>
      <NewFeatures />
    </React.StrictMode>,
    document.getElementById('root')
  );