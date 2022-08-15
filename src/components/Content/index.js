import { clickEvent, checkStatus } from '../../redux/game/gameSlice';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux';

// COMPONENTS
import PlayMoreModal from '../PlayMoreModal';
import ScoreTable from '../ScoreTable';
function Content() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const isGameFinish = useSelector((state) => state.game.isGameFinish);
  const scoreTable = useSelector((state) => state.game.getScoreTable);
  const showAction = (row, column) => {
    dispatch(clickEvent({ row, column }));
    dispatch(checkStatus());
  };

  return (
    <div className='container mx-auto flex items-center justify-center h-[calc(100vh_-_80px)] w-screen'>
      <div className='grid grid-cols-3 flex-1 place-items-center gap-1    mx-6 lg:mx-28 '>
        {board.map((row, rowIndex) =>
          row.map((column, colIndex) => (
            <div
              className='h-36 md:h-40 lg:h-60 w-full  flex items-center justify-center 
              cursor-pointer border-4 border-slate-500 '
              key={Math.random() * 1000}
              onClick={() => showAction(rowIndex, colIndex)}
            >
              <h3 className='text-5xl md:text-7xl tracking-tighter '>
                {column}
              </h3>
            </div>
          )),
        )}
      </div>
      {!isGameFinish && <PlayMoreModal />}
      {scoreTable && <ScoreTable />}
    </div>
  );
}

export default Content;
