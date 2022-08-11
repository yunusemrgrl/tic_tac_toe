import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    isPlayerOne: true,
    isWinner: null,
    players: ['X', 'O'],
    completed: { row: null, column: null, diagonal: null },
  },
  reducers: {
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
      state.players.forEach((player) => {
        if (diagonal1.every((cell) => cell === player)) {
          state.isWinner = `Player ${player} Winner`;
          return;
        } else if (diagonal2.every((cell) => cell === player)) {
          state.isWinner = `Player ${player} Winner`;
          return;
        } else if (state.board.flat().every((cell) => cell !== '')) {
          state.isWinner = 'Draw';
          return;
        }
      });
      state.players.forEach((player) => {
        state.board.forEach((row, rowIndex) => {
          if (row.every((item) => item === player)) {
            console.log(rowIndex);
            state.isWinner = `Player ${player} Winner`;
          }
          row.forEach((column, colIndex) => {
            const columnArr = state.board.map(
              (board) => board[rowIndex][colIndex],
            );
            if (columnArr.every((item) => item === player)) {
              state.isWinner = `Player ${player} Winner`;
            }
          });
        });
      });
    },
    restartGame: (state, action) => {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.isPlayerOne = true;
      state.isWinner = null;
    },
  },
});

export const { clickEvent, restartGame, checkStatus } = gameSlice.actions;
