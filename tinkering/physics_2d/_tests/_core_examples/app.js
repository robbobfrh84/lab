const app_start = async () => {
  // const config = JSON.parse(JSON.stringify(Config)); // Deep copy of Config
  const helper = new Helper(Config)
  await helper.check_hash_image()
  helper.set_width_height()
  helper.build_layers()
  helper.build_walls()
  helper.build_bodies() 
  // - Also runs `build_walls` or just does it in the method. 

  helper.initiate_matter() 
  // - and add_bodies should be done here (after this method, or maybe before?)

  // ? helper.add_bodies()
  // - add bodies (this should also add walls)

  helper.start_matter() 
  setTimeout(()=>{
    console.log('helper:',helper)
  },300)
}
