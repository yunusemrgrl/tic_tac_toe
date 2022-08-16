import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame, setPlayerName } from '../../redux/game/gameSlice';

function LoginModal() {
  const dispatch = useDispatch();

  const [firstPlayerName, setFirstPlayerName] = useState();
  const [secondPlayerName, setSecondPlayerName] = useState();

  const handleStartGame = () => {
    dispatch(setPlayerName({ firstPlayerName, secondPlayerName }));
    dispatch(startGame(false));
  };
  return (
    <div
      className='
     overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full justify-center items-center flex'
    >
      <div className='relative p-4 w-[400px] md:w-full  md:max-w-md h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex flex-col justify-center p-6 text-center items-center'>
            <div className='w-full flex  flex-col gap-y-3 justify-evenly items-center md:flex-row'>
              <span className='block text-4xl text-white tracking-widest line-through decoration-2'>
                XOX
              </span>
              <span className='block text-4xl text-white'>GAME</span>
            </div>
            <div className='py-6 px-4 whitespace-nowrap flex justify-center flex-col gap-y-2   '>
              <label className='flex-1 relative group cursor-pointer block'>
                <input
                  required
                  className='h-14 px-4 w-full border-gray-200 border-2  bg-white rounded outline-none transition-colors group-hover:border-primary-brand-color focus:border-primary-brand-color peer text-sm focus:pt-2  valid:pt-2'
                  maxLength='10'
                  onChange={(e) => setFirstPlayerName(e.target.value)}
                />
                <span className='absolute flex items-center top-0 left-0 h-full px-4 text-sm text-gray-500 transition-all peer-focus:h-7 peer-focus:text-primary-brand-color peer-focus:text-xs peer-valid:h-7 peer-valid:text-primary-brand-color peer-valid:text-xs'>
                  First Player Name
                </span>
              </label>
              <label className='flex-1 relative group cursor-pointer block'>
                <input
                  required
                  maxLength='10'
                  className='h-14 px-4 w-full border-gray-200 border-2  bg-white rounded outline-none transition-colors group-hover:border-primary-brand-color focus:border-primary-brand-color peer text-sm focus:pt-2  valid:pt-2'
                  onChange={(e) => setSecondPlayerName(e.target.value)}
                />
                <span className='absolute flex items-center top-0 left-0 h-full px-4 text-sm text-gray-500 transition-all peer-focus:h-7 peer-focus:text-primary-brand-color peer-focus:text-xs peer-valid:h-7 peer-valid:text-primary-brand-color peer-valid:text-xs'>
                  Second Player Name
                </span>
              </label>
            </div>
            <button
              type='button'
              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex  px-5 py-2.5 my-3'
              onClick={() => handleStartGame()}
            >
              Start the Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
