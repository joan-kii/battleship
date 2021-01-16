const playerFactory = (isComputer) => {
  const player = isComputer ? 'Ordenador' : 'Jugador 1';
  const spotsShooted = [];

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  const shoot = () => {
    if(isComputer) {
      while(!spotsShooted.includes(getRandomNumber(0, 99))) {
        spotsShooted.push()
      }
    }
  };
  
};


export default playerFactory;