var map = {
  points: [
    { x: 0, y: 0, z: 0, },
    { x: 200, y: 200, z: 0, },
    { x: -200, y: 200, z: 0, },
    { x: -200, y: -200, z: 0, },
    { x: 200, y: -200, z: 0, },

    { x: 20, y: 40, z: 0, }, // 5
    { x: 40, y: 40, z: 0, }, // 6
    { x: 40, y: 20, z: 0, }, // 7
    { x: 20, y: 20, z: 0, }, // 8

    { x: 20, y: 40, z: 75, }, // 9
    { x: 40, y: 40, z: 75, }, // 10
    { x: 40, y: 20, z: 75, }, // 11
    { x: 20, y: 20, z: 75, }, // 12

    { x: 20, y: -40, z: 0, }, // 13
    { x: 50, y: -40, z: 0, }, // 14
    { x: 50, y: -20, z: 0, }, // 15
    { x: 20, y: -20, z: 0, }, // 16

    { x: 20, y: -40, z: 50, }, // 17
    { x: 50, y: -40, z: 50, }, // 18
    { x: 50, y: -20, z: 50, }, // 19
    { x: 20, y: -20, z: 50, }, // 20



  ],
  shapes: [
    { type: "mark", pts: [0], r: 5, fill: "firebrick" },

    { type: "mark", pts: [1], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [2], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [3], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [4], r: 5, fill: "cornflowerblue" },

    { type: "path", pts: [1,2,3,4,1], r: 5, fill: "burlywood", stroke: "green" },

    { type: "path", pts: [5,6,7,8,5], r: 5, fill: "grey", stroke: "brown" },
    { type: "path", pts: [9,10,11,12,9], r: 5, fill: "grey", stroke: "brown"},

    { type: "path", pts: [5,9,10,6,5], r: 5, fill: "grey", stroke: "brown"},
    { type: "path", pts: [6,10,11,7,6], r: 5, fill: "grey", stroke: "brown"},
    { type: "path", pts: [7,11,12,8,7], r: 5, fill: "grey", stroke: "brown"},
    { type: "path", pts: [8,12,9,5,8], r: 5, fill: "grey", stroke: "brown"},

    { type: "path", pts: [13,14,15,16,13], r: 5, fill: "lightblue", stroke: "black" },
    { type: "path", pts: [17,18,19,20,17], r: 5, fill: "lightblue", stroke: "black"},

    { type: "path", pts: [13,17,18,14,13], r: 5, fill: "lightblue", stroke: "black"},
    { type: "path", pts: [14,18,19,15,14], r: 5, fill: "lightblue", stroke: "black"},
    { type: "path", pts: [15,19,20,16,15], r: 5, fill: "lightblue", stroke: "black"},
    { type: "path", pts: [16,20,17,13,16], r: 5, fill: "lightblue", stroke: "black"},

  ],

}
