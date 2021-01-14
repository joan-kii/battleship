import gameboardFactory from '../factories/gameboardFactory';
const shipsArrayExpected = [
  {
   "hit": expect.any(expect.any(Function)),
   "isSunk": expect.any(expect.any(Function)),
   "shipLength": 2,
   "shipName": "Destructor",
   "shipPosition": []
  },
  {
  "hit": expect.any(Function),
  "isSunk": expect.any(Function),
  "shipLength": 3,
  "shipName": "Crucero",
  "shipPosition": []
  },
  {
  "hit": expect.any(Function),
  "isSunk": expect.any(Function),
  "shipLength": 3,
  "shipName": "Submarino",
  "shipPosition": []
  },
  {
  "hit": expect.any(Function) ,
  "isSunk": expect.any(Function),
  "shipLength": 4,
  "shipName": "Acorazado",
  "shipPosition": []
  },
  {
  "hit": expect.any(Function),
  "isSunk": expect.any(Function),
  "shipLength": 5,
  "shipName": "Portaviones",
  "shipPosition": []
  }
];

test.only('gameboardFactory return a shipsArray', () => {
  const gameboard = gameboardFactory();
  expect(gameboard).toEqual(expect.arrayContaining(shipsArrayExpected));
});
