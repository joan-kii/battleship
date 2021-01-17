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

  // Check all the ship objects

  it('gameboardFactory return a shipsArray', () => {
    expect(gameboard.shipsArray).toEqual(expect.arrayContaining(shipsArrayExpected));
  });

  // Place the ships

  it('pass the destroyer`s data and returns the destroyer`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[0], 2, true)).toEqual([2, 3]);
  });

  it('pass the cruiser`s data and returns the cruiser`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[1], 5, true)).toEqual([5, 6, 7]);
  });

  it('pass the submarine`s data and returns the submarine`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[2], 8, false)).toEqual([8, 18, 28]);
  });

  it('pass the battleship`s data and returns the battleship`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[3], 60, true)).toEqual([60, 61, 62, 63]);
  });

  it('pass the carrier`s and returns the carrier`s location', () => {
    expect(gameboard.placeShip(gameboard.shipsArray[4], 15, false)).toEqual([15, 25, 35, 45, 55]);
  });

  // Missing shots

  it('pass a shooting spot and returns an array with the missed shots', () => {
    expect(gameboard.receiveAttack(0)).toEqual([0]);
  });

  it('pass another shooting spot and returns an array with the missed shots', () => {
    expect(gameboard.receiveAttack(24)).toEqual([0, 24]);
  });

  it('pass one more shooting spot and returns an array with the missed shots', () => {
    expect(gameboard.receiveAttack(56)).toEqual([0, 24, 56]);
  });

  // Successful shots

  it('pass a shooting spot that hits the destroyer and returns an array with the missed shots', () => {
    expect(gameboard.receiveAttack(2)).toEqual([0, 24, 56]);
  });

  it('check if the destroyer is sunk', () => {
    expect(gameboard.shipsArray[0].isSunk()).toBeFalsy();
  });

  it('pass a shooting spot that hits and sinks the destroyer and returns an array with the missed shots', () => {
    expect(gameboard.receiveAttack(2)).toEqual([0, 24, 56]);
  });

  it('check if the destroyer is already sunk', () => {
    expect(gameboard.shipsArray[0].isSunk()).toBeTruthy();
  });

  // Sink all the ships (the destroyer is already sunk)

  it('sink the cruiser and check no changes in missed shots array', () =>{
    expect(gameboard.receiveAttack(5)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(6)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(7)).toEqual([0, 24, 56]);
  });

  it('check if the cruiser is already sunk', () => {
    expect(gameboard.shipsArray[1].isSunk()).toBeTruthy();
  });

  it('sink the submarine and check no changes in missed shots array', () =>{
    expect(gameboard.receiveAttack(8)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(18)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(28)).toEqual([0, 24, 56]);
  });

  it('check if the submarine is already sunk', () => {
    expect(gameboard.shipsArray[2].isSunk()).toBeTruthy();
  });

  it('sink the battleship and check no changes in missed shots array', () =>{
    expect(gameboard.receiveAttack(60)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(61)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(62)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(63)).toEqual([0, 24, 56]);
  });

  it('check if the battleship is already sunk', () => {
    expect(gameboard.shipsArray[3].isSunk()).toBeTruthy();
  });

  it('check if all the ships are sunken', () => {
    expect(gameboard.checkSunkenShips()).toBeFalsy();
  });

  it('sink the carrier and check no changes in missed shots array', () =>{
    expect(gameboard.receiveAttack(15)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(25)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(35)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(45)).toEqual([0, 24, 56]);
    expect(gameboard.receiveAttack(55)).toEqual([0, 24, 56]);
  });

  it('check if the carrier is already sunk', () => {
    expect(gameboard.shipsArray[4].isSunk()).toBeTruthy();
  });

  it('check if all the ships are already sunken', () => {
    expect(gameboard.checkSunkenShips()).toBeTruthy();
  });
});


