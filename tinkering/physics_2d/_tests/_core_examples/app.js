const app_start = async () => {
  const helper = new Helper(CONFIG)

  // * This order should be matched in Helper.js - So, it's easy to follow the script.
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

  helper_events(helper, 1)
  bottomNavBar_pause.click()

  // 🔥 TEMP
  setTimeout(()=>{
    console.log('\n\n📋\nhelper:',helper)
    console.log('helper.allMatterBodies:',helper.allMatterBodies)
  },300)
}


const helper_events = (helper, opacity) => {

  bottomNavBar_pause.onclick = () => {
    helper.isPaused ? helper.start_matter() : helper.pause_matter()
    bottomNavBar_pause.innerHTML = helper.isPaused ? "Pause" : "GO!"
    helper.isPaused = !helper.isPaused
  }

  bottomNavBar_wireframe.onchange = (e) => {
    CONFIG.wireframe = !CONFIG.wireframe
    app_restart(helper)
  }
  document.getElementById("bottomNavBar_wireframe").checked = CONFIG.wireframe


  bottomNavBar_svg_opacity.onchange = (e) => {
    window[helper.default_main_svg_id].style.opacity = e.target.value
  }
  window[helper.default_main_svg_id].style.opacity = opacity
  document.getElementById("bottomNavBar_svg_opacity").value = opacity

}

const app_restart = (helper) => {
  helper.Matter = null
  helper = null
  physics_2d_container.innerHTML = ""
  app_start()
}



