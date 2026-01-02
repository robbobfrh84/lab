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
    { name: 'Highland', color: '#de891aff', font: 'white'},
    { name: 'Woodland', color: '#6B8E4E', font: 'white'},
    { name: 'Valley', color: '#a74391ff', font: 'white'},
    { name: 'Coastal', color: '#e6d972ff', font: 'black'},
    { name: 'Islands', color: '#2EB8D4', font: 'black'},
    { name: 'Prairie', color: '#D4B857', font: 'black'},
    { name: 'Forest', color: '#2D5A2E', font: 'white'},
    { name: 'Mountain', color: '#9099A2', font: 'black'},
    { name: 'Desert', color: '#E6C77E', font: 'black'},
    { name: 'Swamp', color: '#5C6B3F', font: 'white'},
    { name: 'Tundra', color: '#B8D8E8', font: 'black'},
    { name: 'Jungle', color: '#1B4D2E', font: 'white'},
    { name: 'Volcanic', color: '#C14520', font: 'white'},
  ]

  const sexes = ["M","F","U","AM"]
