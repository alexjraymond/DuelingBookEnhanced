import React from 'react'
import Issue from './components/Issue'
import { knownIssues } from './data/knownIssues'
import { plannedFeatures } from './data/plannedFeatures'

const KnownIssues = () => {
  return (
    <>
      {/* Known Issues */}
      <div className='container justify-center mb-4'>
        <h1 className='text-2xl text-center font-bold bg-gray-200 rounded-lg mb-4'>Known Issues</h1>
        To check where we're at in development, and to see the issues we're aware of, <a href="https://github.com/users/alexjraymond/projects/5/views/1" target='_blank'>click here to see our project roadmap!</a>
      </div>

      {/* Future Plans */}
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
