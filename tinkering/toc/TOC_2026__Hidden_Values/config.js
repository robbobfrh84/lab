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
  // TOC - Hidden Values 2026
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
  // Racers
  { name: 'West', color: '#de891aff', font: 'white'},
  { name: 'Midwest', color: '#C14520', font: 'white'},
  { name: 'South', color: '#2D5A2E', font: 'white'},
  { name: 'Atlantic', color: '#2EB8D4', font: 'black'},
]

const sexes = ["M","F","U","AM"]


/* Tests */
const testTop = { // * NOTE Because it's test, it could have been deleted, will need to copy log after pressing "Offical Match".
  "rowId": "r_g4hST1GY_mjus8t3k",
  "name": "Without name",
  "region": "Woodland",
  "wins": 0,
  "losses": 0,
  "age": 27,
  "sex": "F",
  "notes": "",
  "attributes": "un6t|6o.40.4p.6c.47.4o.2y.4g.47.69.4q.46.4v.4g.2q.46.62.6e.2g.4u.4q.4a.2g.65.6b.40.34.4n.4h.40.4t.6c.47.4o.2w.6p.4v.4o.4r.6a.4r.6a"
}
const testBot = { // * NOTE Because it's test, it could have been deleted, will need to copy log after pressing "Offical Match".
  "rowId": "r_AkvbKF2y_mjvqkea7",
  "name": "Somebody",
  "region": "Islands",
  "wins": 0,
  "losses": 0,
  "age": 21,
  "sex": "U",
  "notes": "",
  "attributes": "p4xa|6j.2e.6j.5t.42.32.4p.3x.42.4n.6k.3n.4q.2u.4k.3n.5x.4s.4a.4b.4k.2o.4a.5m.66.2e.4y.44.4c.2e.6n.5t.42.32.4p.66.4q.32.6g.45.6g.45"
}
