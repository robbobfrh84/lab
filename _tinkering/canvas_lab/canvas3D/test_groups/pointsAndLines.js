var pointsAndLines = {
  points: [
    { x: 0, y: 0, z: 0, },
    { x: 0, y: -150, z: 0, },
    { x: 150, y: 0, z: 0, },
    { x: 0, y: 0, z: 150, },
  ],
  shapes: [
    { type: "mark", pts: [0], r: 5, fill: "black" },
    { type: "mark", pts: [1], r: 5, fill: "cornflowerblue" },
    { type: "mark", pts: [2], r: 5, fill: "firebrick" },
    { type: "mark", pts: [3], r: 5, fill: "darkgoldenrod" },
    { type: "path", pts: [0,1], stroke: "blue" },
    { type: "path", pts: [0,2], stroke: "firebrick" },
    { type: "path", pts: [0,3], stroke: "darkgoldenrod" },
    // { type: "path", pts: [0,1,2], fill: "orange", stroke: "orange"},
    // { type: "path", pts: [0,2,3], fill: "gray", stroke: "gray"},
    // { type: "path", pts: [0,3,1], fill: "green", stroke: "green"},
  ],
}
