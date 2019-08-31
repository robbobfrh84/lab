var cube = {
  points: [
    { x: -200, y: 0, z: 0, },
    { x: -200, y: 0, z: 50, },
    { x: -150, y: 0, z: 50, },
    { x: -150, y: 0, z: 0, },

    { x: -200, y: 50, z: 0, },
    { x: -200, y: 50, z: 50, },
    { x: -150, y: 50, z: 50, },
    { x: -150, y: 50, z: 0, },
  ],
  shapes: [
    { type: "path", pts: [0,1,2,3,0], fill: "orange" },
    { type: "path", pts: [4,5,6,7,4], fill: "blue" },
    { type: "path", pts: [2,6,7,3,2], fill: "green" },
    { type: "path", pts: [1,5,4,0,1], fill: "pink" },
    { type: "path", pts: [1,2,6,5,1], fill: "gray" },
  ],

}
