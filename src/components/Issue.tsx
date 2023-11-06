import React from 'react'

interface IssueProps {
  issue: string
  description: string
}

const Issue: React.FC<IssueProps> = ({ issue, description }) => {
  return (
    <div className='flex flex-grow flex-col my-2'>
      <li className='font-semibold'>{issue}</li>
      <p className='text-xs text-gray-500'>{description}</p>
    </div>
  )
}

export default Issue
