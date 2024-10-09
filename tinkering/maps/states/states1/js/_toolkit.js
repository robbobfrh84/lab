const capitalizeString = (str) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
