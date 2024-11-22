const app_start = async () => {
  const helper = new Helper(Config)
  helper.set_width_height()
  helper.build_layers()
  await helper.check_hash_image()
  helper.build_matter()
}
