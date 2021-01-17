import playerFactory from '../factories/playerFactory';

describe('create the players', () => {
  const player = playerFactory(false);
  const computer = playerFactory(true);

  // Check names

  it('check name player', () => {
    expect(player.name).toBe('Jugador 1');
  });

  it('check name computer', () => {
    expect(computer.name).toBe('Ordenador');
  });

  // Check shoot spot

  it('check avaiable shoot spot player', () => {
    expect(player.shoot(50)).toEqual(expect.arrayContaining([50]));
  });

  it('check avaiable shoot spot computer', () => {
    expect(computer.shoot()).toEqual(expect.any(Array));
  });
})