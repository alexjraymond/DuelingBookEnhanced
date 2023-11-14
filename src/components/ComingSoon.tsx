import React, { useState, useEffect } from 'react';
import card from "../assets/images/dbe_logo.png";

const ComingSoon: React.FC = () => {
  const calculateMaxCardsInRow = () => Math.floor(window.innerWidth / 275);
  const [cardsToRender, setCardsToRender] = useState(Math.min(5, calculateMaxCardsInRow()));

  useEffect(() => {
    const handleResize = () => {
      setCardsToRender(Math.min(5, calculateMaxCardsInRow()));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWord = cardsToRender === 1 ? 'card' : 'cards';

  return (
    <>
      <div className="flex justify-center flex-wrap">
        {Array.from({ length: cardsToRender }, (_, index) => (
          <img key={index} src={card} alt="Card" className="m-2" style={{ width: '128px', height: '128px' }} />
        ))}
      </div>
      <div>
        <h1 className='text-2xl justify-center flex'>We set {cardsToRender} {cardWord} face down and will be back with this section soon...</h1>
      </div>
    </>
  );
}

export default ComingSoon;
