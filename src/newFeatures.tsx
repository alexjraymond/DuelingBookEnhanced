import React from 'react'
import ReactDOM from 'react-dom'

export const NewFeatures = () => {
    const featuresList = [
        'new feature1',
        'newfeature2'
    ]


  return (
    <div className="container mx-auto flex items-stretch h-auto p-4">
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