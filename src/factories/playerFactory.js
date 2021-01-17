const playerFactory = (isComputer) => {
  const name = isComputer ? 'Ordenador' : 'Jugador 1';
  const spotsShooted = [];

  const getRandomNumber = (max) => {
    return Math.round(Math.random() * (max));
  };
  
  const shoot = (playerTarget) => {
    if(isComputer) {

      let availableSpot = true;
      while(availableSpot) {
        let computerTarget = getRandomNumber(100);
        if(!spotsShooted.includes(computerTarget)) {
          spotsShooted.push(computerTarget);
          availableSpot = false;
        }
      } 

    } else {

      if(!spotsShooted.includes(playerTarget)) {
        spotsShooted.push(playerTarget);
      } else {
        return 'choose again';
      }
    }
    return spotsShooted;
  };
  return { name, shoot, spotsShooted }
};

export default playerFactory;
