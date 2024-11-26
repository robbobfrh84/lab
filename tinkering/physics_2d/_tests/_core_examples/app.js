const app_start = async () => {
  const helper = new Helper(Config)

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




  // 🔥 TEMP
  setTimeout(()=>{
    console.log('helper:',helper)
  },300)
}
