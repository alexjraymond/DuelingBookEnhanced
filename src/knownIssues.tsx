import React from 'react'
import Issue from './components/Issue'

const knownIssues = [
    {
        issue: 'Night/Dark Mode Inconsistencies',
        description: "Dark theme doesn't apply to various sections of DB, mainly profile and tertiary spots.",
    },
    {
        issue: "Changed Settings Don't Immediately Take Effect",
        description: "If you change settings while already on duelingbook.com, you need to reload the page for some settings to update.",
    },
]

const plannedFeatures = [
    {
        feature: 'Customizable Hotkeys',
        completed: true,
    },
    {
        feature: 'Changed Settings Immediately Take Effect',
        completed: false,
    },
    {
        feature: 'Milling Hotkey',
        completed: false,
    },
    {
        feature: 'LP Add/Subtract',
        completed: false,
    },
    {
        feature: 'Themes',
        completed: false,
    },
    {
        feature: 'Chain Link Declarations',
        completed: false,
    },
]

const KnownIssues = () => {
    return (
        <>
            <div className='container justify-center mb-4'>
                <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>Known Issues</h1>
                {knownIssues.map((knownIssue) => (
                    <Issue key={knownIssue.issue} issue={knownIssue.issue} description={knownIssue.description} />
                ))}
            </div>
            <div className='container justify-center mb-4'>
                <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>Future Plans</h1>
                <ul className='max-w-md space-y-1 list-disc list-inside'>
                    {plannedFeatures.map((plannedFeature) => (
                        <li
                            key={plannedFeature.feature}
                            className={plannedFeature.completed ? 'line-through' : ''}
                        >
                            {plannedFeature.feature}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default KnownIssues
