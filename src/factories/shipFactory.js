const shipFactory = (name) => {
  
  const regex = /Destructor|Crucero|Submarino|Acorazado|Portaviones/g;
  if (regex.test(name)) {
    const shipName = name;
    const positionsHited = [];
    const hit = (number) => {
      positionsHited.push(number);
    };
    const isSunk = () => {
      return shipLength === positionsHited.length ? true : false;
    };
    let shipLength = 0;
    switch (shipName) {
      case 'Destructor':
        shipLength = 2;
        break;
      case 'Crucero':
      case 'Submarino':
        shipLength = 3;
        break;
      case 'Acorazado':
        shipLength = 4;
        break;
      case 'Portaviones':
        shipLength = 5;
        break;
      default:
        shipLength = 2;
        break;
    }
    return { shipName, shipLength, hit, isSunk };
  }
  throw new Error('pass a string with one of the ship names with the first letter capitalized: Destructor, Crucero, Submarino, Acorazado or Portaviones');
};


export default shipFactory;