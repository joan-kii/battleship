import React from 'react';

const computerCells = [];

const createGrid = () => {
  for(let i = 0; i < 100; i++) {
    computerCells.push(<div key={i}></div>);
  }
};

const GridComputer = () => {
  return (
    <div className='grid grid-computer'>
      { computerCells }  
    </div>
  )
};

createGrid();

export default GridComputer;