const shipFactory = (name) => {
  
  const shipName = name;
  const positionsHited = [];
  const hit = (number) => {
    positionsHited[number] = number;
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
};

export default shipFactory;