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

  helper_events(helper, 1, CONFIG, initial)
  bottomNavBar_pause.click()
  helper.calculate_fps()

  setTimeout(()=>{
    console.log('\n\n📋\nhelper:', helper)
    console.log('helper.allMatterBodies:', helper.allMatterBodies)
  },300)
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
      topNavBar_title.innerHTML = `Physics 2d Helper - ${config.name}`
      const h = getHelper()
      h.matter_reset()
      app_start(getConfig()) 
    });
  }

}





