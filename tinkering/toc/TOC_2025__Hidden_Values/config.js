  const tableColumns = [
    { name: 'name', label: 'name' },
    { name: 'region', label: 'region' },
    { name: 'wins', label: 'W' },
    { name: 'losses', label: 'L' },
    { name: 'percent', label: '%', func: calcWinPercent },
    { name: 'age', label: 'age' },
    { name: 'sex', label: 'sex' }
  ]

  const regionsObj = [
    { name: 'Highland', color: '#de891aff'},
    { name: 'Woodland', color: '#6B8E4E'},
    { name: 'Valley', color: '#a74391ff'},
    { name: 'Coastal', color: '#e6d972ff'},
    { name: 'Islands', color: '#2EB8D4'},
    { name: 'Prairie', color: '#D4B857'},
    { name: 'Forest', color: '#2D5A2E'},
    { name: 'Mountain', color: '#9099A2'},
    { name: 'Desert', color: '#E6C77E'},
    { name: 'Swamp', color: '#5C6B3F'},
    { name: 'Tundra', color: '#B8D8E8'},
    { name: 'Jungle', color: '#1B4D2E'},
    { name: 'Volcanic', color: '#C14520'},
  ]

  const sexes = ["M","F","U","AM"]
