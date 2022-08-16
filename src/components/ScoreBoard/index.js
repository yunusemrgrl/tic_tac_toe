import React from 'react';
import { useSelector } from 'react-redux';

function ScoreBoard() {
  const players = useSelector((state) => state.game.playersName);
  return (
    <div>
      <div className='py-6 px-4 whitespace-nowrap flex justify-center gap-x-4 md:gap-x-10'>
        {players.map((player, index) =>
          Object.values(player).map((item) => (
            <div
              key={index}
              className='font-semibold  text-gray-700  flex justify-between gap-x-3'
            >
              <div>{item.name}: </div>
              <div>{item.score}</div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default ScoreBoard;
