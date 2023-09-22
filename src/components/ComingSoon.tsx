import React from 'react'
import card from "../public/dbe_logo.png"

const ComingSoon = () => {
  return (
    <>
        <div className="flex justify-center">
            <img src={card} />
            <img src={card} />
            <img src={card} />
            <img src={card} />
            <img src={card} />
        </div>
        <div>
            <h1 className='text-2xl justify-center flex'>We set 5 cards face down and will be back with this section soon...</h1>
        </div>
      </>
  )
}

export default ComingSoon