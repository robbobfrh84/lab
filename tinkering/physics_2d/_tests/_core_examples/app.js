const app_start = async (file, initial) => {
  const CONFIG = window[file.fileVar]
  const helper = new Helper(JSON.parse(JSON.stringify(CONFIG)))

  // * 👇 This order of events should be matched in Helper.js - So, it's easy to follow the script.
  await helper.check_hash_image()
  helper.set_width_height()

  helper.build_layers()
  helper.build_walls()
  await helper.build_bodies() 

  helper.initiate_matter()
  helper.add_bodies()
  helper.set_matter() 
  helper.start_matter() 

  helper.matter_events('track')
  // * 👆 

  helper_events(helper, helper.svgOpacity, CONFIG, initial)
  add_svg_defs(window[helper.default_main_svg_id+"_defs"])
  bottomNavBar_pause.click()
  helper.calculate_fps()
  log_helper(helper)
}


const helper_events = (helper, opacity, CONFIG, initial) => {

  bottomNavBar_pause.onclick = () => {
    helper.isPaused ? helper.start_matter() : helper.pause_matter()
    bottomNavBar_pause.innerHTML = helper.isPaused ? "Pause" : "GO!"
    helper.isPaused = !helper.isPaused
    helper.calculate_fps()
  }

  bottomNavBar_wireframe.onchange = (e) => {
    CONFIG.wireframe = !CONFIG.wireframe
    helper.matter_reset()
    app_start(getConfig()) 
  }
  document.getElementById("bottomNavBar_wireframe").checked = CONFIG.wireframe

  bottomNavBar_svg_opacity.onchange = (e) => {
    window[helper.default_main_svg_id].style.opacity = e.target.value
  }
  window[helper.default_main_svg_id].style.opacity = opacity
  document.getElementById("bottomNavBar_svg_opacity").value = opacity

  getHelper = () => helper

  if (initial) {
    configSelect.addEventListener('change', (event) => {
      CURRENT_CONFIG = event.target.value
      const config = getConfig()
      topNavBar_title.innerHTML = `${config.name}`
      const h = getHelper()
      h.matter_reset()
      app_start(getConfig()) 
    });
  }

}


const log_helper = (helper) => {
  setTimeout(()=>{
    console.log('\n * 👀 See `./Config` files! *\n\n📋 Helper instance:\n-----', helper)
    console.log('helper.allMatterBodies:', helper.allMatterBodies)
    helper.static_body_groups.forEach( g => { console.log('\n- Static group: "'+g.name+'"')
      g.bodies.forEach((b,i) => { console.log(b) })
    })
    helper.dynamic_body_groups.forEach( g => { console.log('\n- Dynamic group: "'+g.name+'"')
      g.bodies.forEach((b,i) => { console.log(b) })
    })
  },50)
}

const add_svg_defs = (elm) => {
  elm.innerHTML += /*html*/`

    <filter id="svg_dropShadow">
      <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" flood-color="black" flood-opacity="0.7"/>
    </filter>

    <filter id="svg_dropShadow2">
      <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="cyan" flood-opacity="1"/>
    </filter>
    
    <filter id="svg_dropShadow3">
      <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="black" flood-opacity="1"/>
    </filter>
    
  `
}






