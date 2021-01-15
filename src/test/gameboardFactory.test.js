import gameboardFactory from '../factories/gameboardFactory';
const shipsArrayExpected = [
  {
   "hit": expect.any(Function),
   "isSunk": expect.any(Function),
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

describe('create the gameboard and place the ships', () => {
  const gameboard = gameboardFactory();

  it('gameboardFactory return a shipsArray', () => {
    expect(gameboard.shipsArray).toEqual(expect.arrayContaining(shipsArrayExpected));
  });

  it('pass the ship length, the coords of the ship`s position and the ship`s rotation and returns the ship`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[3], 25, true)).toEqual([25, 26, 27, 28]);
  });

  it('pass the ship length, the coords of the ship`s position and the ship`s not rotation and returns the ship`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[4], 15, false)).toEqual([15, 25, 35, 45, 55]);
  });
});


