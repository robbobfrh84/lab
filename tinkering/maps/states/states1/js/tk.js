const tk_capString = (str) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const tk_random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// const tk_removeByID = (arr,id) => { 
//   return arr.filter(item => item.id !== id)
// }

// const tk_getByID = (arr,id) => { 
//   return arr.filter(item => item.id === id)[0]
// }

const tk_sort = (arr,sort,order) => { 
  if (order === "ascending") {
    return arr.sort((a,b) => a[sort] > b[sort] ? 1 : -1)
  } else if (order === "descending") {
    return arr.sort((a,b) => a[sort] < b[sort] ? 1 : -1)
  } else {
    console.log('tk_sort: order not recognized "+order+"')
  }
}