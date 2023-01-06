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
  leftTopBee: {
    start:  { x: 0.08, y: 0.05, w: 0.2, h: 0.115 },
  }
}