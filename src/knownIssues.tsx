import React from 'react'
import Issue from './components/Issue'

const KnownIssues = () => {
  return (
    <>
        <div className='container justify-center'>
            <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg'>Known Issues</h1>
        <Issue issue='Night/Dark Mode inconsistencies' description="doesn't apply to certain sections of DB, mainly profile and tertiary spots" />
        </div>
        <div className='container justify-center'>
            <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg'>Future Plans</h1>
            <ul className='max-w-md space-y-1 list-disc list-inside'>
                <li>
                    Customizeable Hotkeys
                </li>
                <li>
                    Milling Hotkey
                </li>
                <li>
                    LP add/subtract 
                </li>
                <li>
                    Themes
                </li>
                <li>
                    Chain Link declaration
                </li>
            </ul>
        </div>
    </>
  )
}

export default KnownIssues