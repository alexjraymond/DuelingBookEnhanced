import React from 'react'

interface IssueProps {
    issue: string
    description: string
}

const Issue: React.FC<IssueProps> = ({issue, description}) => {
  return (
    <div className='flex flex-grow flex-col'>
    <h1 className='text-lg font-semibold'>{issue}</h1>
    <p className='text-xs text-gray-500'>{description}</p>
    </div>
  )
}

export default Issue