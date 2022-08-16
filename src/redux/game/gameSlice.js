import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    isShowModal: true,
    isPlayerOne: true,
    isWinner: null,
    announceWinner: null,
    playersName: [
      {
        firstplayer: { name: 'First Player', selection: 'X', score: 0 },
      },
      {
        secondplayer: { name: 'Second Player', selection: 'O', score: 0 },
      },
    ],
    theWinner: null,
    isGameFinish: false,
    getScoreTable: false,
    selection: ['X', 'O'],
  },
  reducers: {
    setPlayerName: (state, action) => {
      const { firstPlayerName, secondPlayerName } = action.payload;
      if (
        firstPlayerName === undefined ||
        secondPlayerName === undefined ||
        firstPlayerName.trim() === '' ||
        secondPlayerName.trim() === ''
      )
        return;
      state.playersName[0].firstplayer.name = firstPlayerName.toUpperCase();
      state.playersName[1].secondplayer.name = secondPlayerName.toUpperCase();
    },
    startGame: (state, action) => {
      state.isShowModal = action.payload;
    },
    clickEvent: (state, action) => {
      if (state.isWinner !== null) return;
      const { row, column } = action.payload;
      if (state.board[row][column] !== '') return;
      if (state.isPlayerOne) {
        state.board[row][column] = 'X';
      } else {
        state.board[row][column] = 'O';
      }
      state.isPlayerOne = !state.isPlayerOne;
    },
    checkStatus: (state, action) => {
      const diagonal1 = [
        `${state.board[0][0]}`,
        `${state.board[1][1]}`,
        `${state.board[2][2]}`,
      ];
      const diagonal2 = [
        `${state.board[0][2]}`,
        `${state.board[1][1]}`,
        `${state.board[2][0]}`,
      ];
      state.selection.forEach((player) => {
        if (diagonal1.every((cell) => cell === player)) {
          state.isWinner = player;
          return;
        } else if (diagonal2.every((cell) => cell === player)) {
          state.isWinner = player;
          return;
        } else if (state.board.flat().every((cell) => cell !== '')) {
          state.isWinner = 'Draw';
          return;
        }
      });
      state.selection.forEach((player) => {
        state.board.forEach((row, rowIndex) => {
          if (row.every((item) => item === player)) {
            state.isWinner = player;
          }
          row.forEach((column, colIndex) => {
            const columnArr = state.board.map(
              (board) => board[rowIndex][colIndex],
            );
            if (columnArr.every((item) => item === player)) {
              state.isWinner = player;
            }
          });
        });
      });
      if (state.isWinner === null) return;
      if (state.isWinner === state.playersName[0].firstplayer.selection) {
        state.announceWinner = state.playersName[0].firstplayer.name;
        state.playersName[0].firstplayer.score++;
      } else if (
        state.isWinner === state.playersName[1].secondplayer.selection
      ) {
        state.announceWinner = state.playersName[1].secondplayer.name;
        state.playersName[1].secondplayer.score++;
      } else {
        state.announceWinner = 'DRAW';
      }
      localStorage.setItem('score', JSON.stringify(state.playersName));
      if (
        state.playersName[0].firstplayer.score > 2 ||
        state.playersName[1].secondplayer.score > 2
      ) {
        state.getScoreTable = true;
        state.isGameFinish = true;
      }
    },
    playAgain: (state, action) => {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.isPlayerOne = true;
      state.isWinner = null;
      state.announceWinner = null;
    },
    restartGame: (state, action) => {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.playersName = [
        {
          firstplayer: { name: 'First Player', selection: 'X', score: 0 },
        },
        {
          secondplayer: { name: 'Second Player', selection: 'O', score: 0 },
        },
      ];
      state.isPlayerOne = true;
      state.isWinner = null;
      state.announceWinner = null;
      state.getScoreTable = false;
      state.isGameFinish = false;
      state.isShowModal = true;
      localStorage.removeItem('score');
    },
  },
});

export const {
  clickEvent,
  playAgain,
  checkStatus,
  startGame,
  setPlayerName,
  restartGame,
} = gameSlice.actions;
