const scene_1_script = {
  duration: 5, // seconds
  elementId: "scene1",
  groups: [
    { id: "Left_Group",
      l: [100,,,100], s: 24, d: [ 60, [90,.9], [359,1] ],
      arms: [
        { s: [18,90], d: [0],
          hinges: [
            { id: "Lower_Leg",
              l: [,,0,0], s: 24, d: [ 0, [359,1] ],
              arms: [
                { s: [8,90], d: [0], bc: "blue" }
              ]
            }
          ]
        },
        { s: [12,90], d: [45], bc: "cornflowerblue" },
      ]
    },
    { id: "Right_Group",
      l: [100,100,0,0], s: [16], d: [ [180,.1], [0,1] ],
      bc: 'pink',
      arms: [
        { s: [8,90], d: [0] },
      ]
    },
  ]
}
// TO DO
// Make a PERCENT option
// why not just add the css from base.css to the one you create?
