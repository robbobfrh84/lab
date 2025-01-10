var polygons_and_trapezoids = { // Config
  wireframe: true, // * Default false - Matter.js wireframe mode (Can't be done individually, it's all on or off!)
  svgOpacity: 0.6, // * Default 1
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  background: "cornflowerblue", // * Default is "2a2a2a"
  gravity: { x: 0, y: 1 }, // * Matter.js gravity. Default(x:0,y:1)
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

  static_body_groups: [  

    {
      name: "Static Matter", type: "matter", 
      bodies: [
        { name: 'Polygon', shape: 'poly',  
          x: 80, y: 80, sides: 8, r: 8, 
          options: { fillStyle: "red" } 
        },
        { name: 'Trapezoid', shape: 'trap',  
          x: 80, y: 65, w: 8, h: 4, slope: 0.5, // * slope: 0-1
          options: { fillStyle: "blue" } 
        },
      ]
    },

    {
      name: "Static SVG", type: "svg", layerId: "mask_layer",
      bodies: [
        { name: 'SVG 3-sided Polygon', shape: 'poly',  
          x: 51, y: 81, sides: 3, r: 7, rotate: 60, 
          svg: /*html*/`
            <polygon fill="red" stroke="orange" stroke-width="2"
              points="${ gen_poly_pts(3,5.6,0) }" /> 
          `,
        },
      ]
    }

  ],

  dynamic_body_groups: [

/* 🌙 SVG  Examples */
    { 
      name: "1st col - Trapazoids",  type: "svg", layerId: "mask_layer",
      bodies: [ 
        { name: 'just fill', shape: 'trap',  
          x: 15, y: 10, w: 8, h: 4, slope: 0.5, // * slope: 0-1
          svg: /*html*/`
            <polygon fill="pink"/>`,
        },
        { name: 'fill and stroke', shape: 'trap',  
          x: 16, y: 17, w: 10, h: 5, slope: 0.5, // * slope: 0-1
          svg: /*html*/`
            <polygon fill="blue" stroke="pink" stroke-width="1"/>`,
        },
        { name: '<g> with image', shape: 'trap',  
          x: 16, y: 30, w: 16, h: 10, slope: 0.5, // * slope: 0-1
          svg: /*html*/`
          <g>
            <image width="16" x="-8" y="-8.5" 
              href="assets/box.png" />
          </g>`,
        },
        { name: 'Override Points', shape: 'trap',  
          x: 16, y: 43, w: 12, h: 6, slope: 0.4, // * slope: 0-1
          svg: /*html*/`
            <polygon fill="blue" stroke="pink" stroke-width="1"
              points="-3.1,-2.9 3.1,-2.9 5.5,2.5 -5.5,2.5"/>`,
        },
      ]
    },

    { 
      name: "2nd col - Polygons",  type: "svg", layerId: "mask_layer",
      bodies: [ 
        { name: 'just fill', shape: 'poly',  
          x: 45, y: 10, sides: 6, r: 6, 
          svg: /*html*/`
            <polygon fill="lime"/>`,
        },
        { name: 'fill and stroke', shape: 'poly',  
          x: 59, y: 12, sides: 6, r: 6, 
          svg: /*html*/`
            <polygon fill="lime" stroke="violet" stroke-width="2"/>`,
        },
        { name: '<g> with image', shape: 'poly',  
          x: 50, y: 25, sides: 8, r: 7, 
          svg: /*html*/`
          <g>
            <image width="16" x="-8" y="-7.5"  transform="rotate(60,0,0)"
              href="assets/big_snowball_1.png" />
          </g>`,
        },
        { name: 'Override with toolkit poly generator', shape: 'poly',  
          x: 46, y: 41, sides: 5, r: 7, rotate: 22.5, 
          svg: /*html*/`
            <polygon fill="lime" stroke="violet" stroke-width="2"
              points="${ gen_poly_pts(5,5.6,(360/10)+22.5) }" /> 
          `,
        },
        { name: 'multi <g> layers', shape: 'poly',  
          x: 58, y: 55, sides: 8, r: 8, rotate: 22.5, 
          svg: /*html*/`
            <g>
              <polygon fill="rgb(155, 0, 0)" points="${ gen_poly_pts(8,8,0) }" 
                filter="url(#svg_dropShadow3)"/>
              <polygon fill="rgb(255, 0, 0)" points="${ gen_poly_pts(7,7,90)} " />
              <polygon fill="rgb(255, 100, 0)" points="${ gen_poly_pts(6,6,90)} " />
              <polygon fill="rgb(255, 170, 0)" points="${ gen_poly_pts(5,5,90)} " />
              <polygon fill="rgb(255, 210, 0)" points="${ gen_poly_pts(4,4,90)} " />
              <polygon fill="rgb(255, 255, 0)" points="${ gen_poly_pts(3,3,90)} " />
            </g>
          `,
        },
      ]
    },
    
/* 🧚‍♀️ Using Matter.js only */
    { 
      name: "3rd col - Matter only",  type: "matter", layerId: "mask_layer",
      bodies: [ 
        { name: 'Polygon 6-sides', shape: 'poly',  
          x: 79, y: 10, sides: 6, r: 4, 
          options: { fillStyle: "red" } 
        },
        { name: 'Polygon 3-sides', shape: 'poly',  
          x: 79, y: 20, sides: 3, r: 4, 
          options: { fillStyle: "green" } 
        },
        { name: 'Polygon 10-sides', shape: 'poly',  
          x: 79, y: 33, sides: 10, r: 6, 
          options: { fillStyle: "orange" } 
        },
        { name: 'Trapezoid', shape: 'trap',  
          x: 84, y: 50, w: 10, h: 3, slope: 0.5, // * slope: 0-1
          options: { fillStyle: "blue" } 
        },
      ]
    },
   
  ],

}

