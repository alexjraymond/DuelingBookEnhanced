import React from 'react'
import Issue from './components/Issue'
import { knownIssues } from './data/knownIssues'
import { plannedFeatures } from './data/plannedFeatures'

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
