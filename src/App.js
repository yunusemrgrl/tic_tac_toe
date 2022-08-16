import { useSelector } from 'react-redux';
import Content from './components/Content';
import LoginModal from './components/LoginModal';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const isShowModal = useSelector((state) => state.game.isShowModal);
  return (
    <div className='flex flex-col '>
      {!isShowModal && <ScoreBoard />}
      {isShowModal && <LoginModal />}
      <Content />
    </div>
  );
}

export default App;
