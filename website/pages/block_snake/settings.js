const S = { // * S for the game "(S)ettings".
  gridSize: { r: 13, c: 20 }, // * r for rows, c for columns
  blockSize: 25, // 25 
  blockGap: 1, 
  starting_direction: { axis: 'r', dir: -1 },
  starting_speed: 300, // * ms delay between moves.
  startingFood: 5,
  respawn_food_delay: 5, // * Number of moves after a food is eaten before a new food spawns.
  sprites: {
    snake: {
      head: 'goldenrod', 
      mouthOpen: 'sienna',
      body: 'limegreen', 
      digesting: 'olivedrab',
      tail: 'gold',
      hitSelf: 'rgba(255,0,0,0.5)',
    },
    food: {
      apple: 'orangered',
      blueBerry: 'cornflowerblue'
    }
  },
  snake: [ 
    // { r: 1, c: 2, s:'head' }, 
    // { r: 1, c: 3, s:'body' }, 
    // { r: 1, c: 4, s:'tail' },

    { r: 5, c: 5, s:'head' }, 
    { r: 5, c: 6, s:'body' }, 
    { r: 6, c: 6, s:'body' }, 
    { r: 6, c: 7, s:'body' },
    { r: 6, c: 8, s:'body' },
    { r: 7, c: 8, s:'body' },
    { r: 8, c: 8, s:'body' },
    { r: 8, c: 7, s:'tail' },
  ],

  /* CSS Settings */
  emptyCellColor: "rgba(0,0,0,0.2)",
}