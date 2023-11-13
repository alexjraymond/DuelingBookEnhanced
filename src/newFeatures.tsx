import React from 'react'
import ReactDOM from 'react-dom'

export const NewFeatures = () => {
    const featuresList = [
        'new feature1',
        'newfeature2'
    ]


  return (
    <div>
        <h1>What's New</h1>

        Thank you for using DuelingBookEnhanced, here are some updates for THISVERSION




    </div>
  )
}

ReactDOM.render(
    <React.StrictMode>
      <NewFeatures />
    </React.StrictMode>,
    document.getElementById('root')
  );