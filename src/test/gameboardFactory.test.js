import gameboardFactory from '../factories/gameboardFactory';
const shipsArrayExpected = [
  {
   "hit": hit,
   "isSunk": Function,
   "shipLength": 2,
   "shipName": "Destructor",
   "shipPosition": []
  },
  {
  "hit": Function,
  "isSunk": Function,
  "shipLength": 3,
  "shipName": "Crucero",
  "shipPosition": []
  },
  {
  "hit": Function,
  "isSunk": Function,
  "shipLength": 3,
  "shipName": "Submarino",
  "shipPosition": []
  },
  {
  "hit": Function,
  "isSunk": Function,
  "shipLength": 4,
  "shipName": "Acorazado",
  "shipPosition": []
  },
  {
  "hit": Function,
  "isSunk": Function,
  "shipLength": 5,
  "shipName": "Portaviones",
  "shipPosition": []
  }
];

test.only('gameboardFactory return a shipsArray', () => {
  expect(gameboardFactory()).toEqual(expect.arrayContaining(shipsArrayExpected));
});
