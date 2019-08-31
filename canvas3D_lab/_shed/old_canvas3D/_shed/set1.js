const set1 = [

{ line:   new Line({ p1: [-200,-200,200], p2: [200,200,0], t: 3,  color: "cornflowerblue"}) },
{ line:   new Line({ p1: [-200,200,0], p2: [200,-200,200], t: 3,  color: "cornflowerblue"}) },

{ point:  new Point({ x: 0,   y: 0,   z: 0,   r: 5,   color: "firebrick"}) },

{ point:  new Point({ x: 0,   y: -200, z: 0,   r: 3,   color: "firebrick"}) },
{ point:  new Point({ x: 200, y: 0,   z: 0,   r: 3,   color: "firebrick"}) },
{ point:  new Point({ x: 0,   y: 200, z: 0,   r: 3,   color: "firebrick"}) },
{ point:  new Point({ x: -200,   y: 0, z: 0,   r: 3,   color: "firebrick"}) },


{ point:  new Point({ x: 50,  y: 40,  z: 10,  r: 5,   color: "green"}) },
{ point:  new Point({ x: 150, y: 140, z: 200, r: 10,  color: "green"}) },

// box left
// top, right, bottom, left
{ line:   new Line({ p1: [-200,20,0], p2: [-200,20,50], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,20,50], p2: [-200,120,50], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,120,50], p2: [-200,120,0], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,120,0], p2: [-200,20,0], t: 2,  color: "blue"}) },

// box right
// top, right, bottom, left
{ line:   new Line({ p1: [-150,20,0], p2: [-150,20,50], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-150,20,50], p2: [-150,120,50], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-150,120,50], p2: [-150,120,0], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-150,120,0], p2: [-150,20,0], t: 2,  color: "blue"}) },

// connecting lines
// top near, back, bottom near, back
{ line:   new Line({ p1: [-200,20,0], p2: [-150,20,0], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,20,50], p2: [-150,20,50], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,120,0], p2: [-150,120,0], t: 2,  color: "blue"}) },
{ line:   new Line({ p1: [-200,120,50], p2: [-150,120,50], t: 2,  color: "blue"}) },

]
