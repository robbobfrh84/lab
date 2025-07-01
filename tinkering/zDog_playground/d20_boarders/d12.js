const d12 = {
  "0": {
    location: [{}],
    rotate: 0
  },
  "1": {
    location: [{ x: -(TAU/4) }],
    rotate: 0
  },
  "2": { // Empty > location: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }],
    location: [{}],
    // location: [{ x: (TAU/4), y: (TAU/4), z: (TAU/4) }, { x: 0, y: 0, z: 0 }],
    // location: [{ x: -Math.atan(1/2), y: (TAU/10) * 4, z: 0 }, { x: 0, y: 0, z: (TAU/10) * 5 }],

    // location: [{ x: -Math.atan(1/2), y: -(TAU/5) * 3 }],
    // location: [{ x: -Math.atan(1/2), y: -(TAU/5) * 3}, { x: 0, y: 0, z: 0 }],
    location: [{ x: Math.atan(1/2), y: (TAU/5) * 2,}, { x: Math.atan(2) }],
    rotate: (TAU/5) * 2
  },
  "3": {
    location: [{ x: Math.atan(1/2), y: (TAU/5) * 3,}, { x: Math.atan(2) }],
    rotate: -(TAU/5) * 2
  },
  "4": {
    // location: [{ x:- Math.atan(1/2), y: -(TAU/5) * 4}],
    location: [{ x: -(TAU/4), y:  (TAU/10) * 7  }, { x: Math.atan(2), y: -(TAU/5) * 4  }],
    rotate: -(TAU/5)
  },
  "5": {
    location: [{ x: -(TAU/4), y:  (TAU/10) * 3  }, { x: Math.atan(2), y: -(TAU/5) * 1  }],
    rotate: (TAU/5) * 1
  },
  "6": {
    location: [{ x: -(TAU/4), y:  (TAU/10) * 5  }, { x: Math.atan(2), y: -TAU  }],
    rotate: 0
  },
  "7": {
    location: [{ x: -(TAU/4), z: -(TAU/4) * 2 }, { x: Math.atan(2) }],
    rotate: 0
  },
  "8": {
    location: [{ x: Math.atan(1/2), y: -(TAU/5) * 4 }, {x: Math.atan(2) }],
    rotate: -(TAU/5) * 1
  },
  "9": {
    location: [{ x: Math.atan(1/2), y: -(TAU/5) * 1 }, {x: Math.atan(2) }],
    rotate: (TAU/5) * 1
  },
  "10": {
    location: [{ x: (TAU/4), y: (TAU/10) * 9 }, {x: Math.atan(2), y: -(TAU/5) * 2 }],
    rotate: (TAU/5) * 2
  },
  "11": {
    location: [{ x: (TAU/4), y: (TAU/10) * 1 }, {x: Math.atan(2), y: -(TAU/5) * 3 }],
    rotate: -(TAU/5) * 2
  },
  "12": {
    location: [{ x: (TAU/4) }],
    rotate: 0
  },
}