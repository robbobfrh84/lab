var map = {
  points: [
    { x: 0, y: 0, z: 0, },
    { x: 200, y: 200, z: 0, },
    { x: -200, y: 200, z: 0, },
    { x: -200, y: -200, z: 0, },
    { x: 200, y: -200, z: 0, },

    { x: 20, y: 40, z: 15, },
    { x: 40, y: 40, z: 75, },
    { x: 40, y: 20, z: 15, },

  ],
  shapes: [
    { type: "mark", pts: [0], r: 5, fill: "gray" },

    { type: "mark", pts: [1], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [2], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [3], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [4], r: 5, fill: "cornflowerblue" },

    { type: "path", pts: [1,2,3,4,1], r: 5, fill: "burlywood", stroke: "burlywood" },
    { type: "path", pts: [5,6,7], r: 5, fill: "grey", },

  ],

}
