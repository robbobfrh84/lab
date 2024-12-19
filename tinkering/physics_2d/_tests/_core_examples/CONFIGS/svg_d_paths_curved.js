var svg_d_paths_curved = { // Config
  wireframe: true, // * Default false - Matter.js wireframe mode (Can't be done individually, it's all on or off!)
  svgOpacity: 0.5, // * Default 1
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  background: "cornflowerblue", // * Default is "2a2a2a"
  gravity: { x: 0, y: 1 }, // * Matter.js gravity. Default(x:0,y:1)
  default_user_image: "assets/cat.png",
  default_container_id: "physics_2d_container",
  default_main_matter_id: "main_matter_layer", // * 👇 Set in layers.
  default_main_svg_id: "mask_layer", // * 👇 Set in layers.
  layers: [ // types: 'matter','svg'
    { type: "svg", id: "border_layer" },
    { type: "svg", id: "background_layer" },
    { type: "matter", id: "main_matter_layer" },
    { type: "svg", id: "mask_layer" }, 
  ],
  wall_bodies: { thickness: 2, show: [ true, true, true, true ] }, // show: [top, right, bottom, left]

  // static_body_groups: [  
  //   {
  //     name: "static matter tests", type: "matter", 
  //     bodies: [
  //     ]
  //   }
  // ],

  dynamic_body_groups: [
/* 🧚‍♀️ Using Matter.js only to render styles and sprites examples */
    // { 
    //   name: "dynamic matter tests", type: "matter", 
    //   bodies: [ 
    //   ]
    // },

/* 🌙 SVG Examples */
    { 
     name: "svg fromVerticies",  type: "svg", layerId: "mask_layer",
      bodies: [    

        { shape: 'verts', name: 'path layer svg - yellow green', x: 50, y: 20, v: [
          { x: 0, y: -7 }, { x: 3, y: -6 },
          { x: 8, y: 0 }, { x: 5, y: 6 },
          { x: 0, y: 8 }, { x: -4, y: 6 },
          { x: -7, y: 0 }, { x: -5, y: -5 },
        ],
          svg: /*html*/`
            <path d="M1.74,20 Q3.48,17.83 4.35,20 T7.83,20" fill="red" stroke="blue" stroke-width="1"/>
          `,
        }
      ]
    }

  ],

}


// *** Move to tooklit ***

function scaleSvgPath(d, minMax, currentMinMax) {
  // Destructure the minMax and currentMinMax arrays
  const [minNew, maxNew] = minMax;
  const [minOld, maxOld] = currentMinMax;

  // Function to scale a single value
  const scaleValue = (value) => ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew) + minNew;

  // Regex to find all numbers in the path string
  return d.replace(/(\d+(\.\d+)?)/g, (match) => {
      const scaledValue = scaleValue(parseFloat(match));
      // Format the number based on whether it is a whole number
      return (scaledValue % 1 === 0) ? `${scaledValue}` : scaledValue.toFixed(2);
  });
}

// Example usage
// const d = "M20,230 Q40,205 50,230 T90,230";
// const minMax = [0, 20];
// const currentMinMax = [0, 230];
// const scaledPath = scaleSvgPath(d, minMax, currentMinMax);

// console.log(scaledPath);

