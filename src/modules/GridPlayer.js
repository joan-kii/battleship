import React from 'react';

const createGrid = () => {
  const divs = [];
  for(let i = 0; i < 100; i++) {
    divs.push(<div key={i}></div>);
  }
  console.log(divs);
  return divs;
};

const GridPlayer = () => {
  return (
    <div className='grid grid-player' >
      { createGrid() }
    </div>
  )
};

export default GridPlayer;