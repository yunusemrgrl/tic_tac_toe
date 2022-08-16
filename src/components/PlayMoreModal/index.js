import { playAgain } from '../../redux/game/gameSlice';
import { useSelector } from 'react-redux/es/exports';

import { useDispatch } from 'react-redux';
function PlayMoreModal() {
  const dispatch = useDispatch();

  const isWinner = useSelector((state) => state.game.isWinner);
  const theWinner = useSelector((state) => state.game.announceWinner);

  const setContinue = () => {
    dispatch(playAgain());
  };

  return (
    <div
      className={
        isWinner === null
          ? 'hidden transition-all'
          : 'transition-all overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 inset-0 h-modal h-full justify-center items-center flex'
      }
    >
      <div className='relative p-4 w-full max-w-sm md:max-w-md h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex flex-col justify-center p-6 text-center items-center'>
            <svg
              aria-hidden='true'
              className='mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='mb-5 text-lg font-normal text-white'>
              {theWinner !== 'DRAW' ? theWinner + ' Win !' : theWinner}
            </h3>
            <button
              type='button'
              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex  px-5 py-2.5 '
              onClick={() => setContinue()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayMoreModal;
