const hanna = {
  // 👩 Face 👩
  leftEye: {
    rangeX: { min: -0.04, max: 0.02 }, // min is toward LEFT
    rangeY: { min: -0.02, max: 0.02 } // min is toward TOP
  },
  rightEye: {
    rangeX: { min: -0.02, max: 0.06 }, // min is toward LEFT
    rangeY: { min: -0.02, max: 0.03 }, // min is toward TOP
    angleY: { min: -0.00, max: -0.02 } // min is really just left side, negiive toward top, max is right side.
  },
  leftBrow: {
    rangeY: { min: -0.03, max: 0.03 } // min is toward TOP
  },
  rightBrow: {
    rangeY: { min: -0.03, max: 0.03 } // min is toward TOP
  },
  // 🐝 Bees 🐝 
  bees: {
    leftTopBee:     { x: 0.1, y: 0.1, w: 0.1 },
    rightTopBee:    { x: 0.82, y: 0.08, w: 0.12 },
    leftBottomBee:  { x: 0.06, y: 0.80, w: 0.2 },
    rightBottomBee: { x: 0.7, y: 0.6, w: 0.2 }
  }
  
}