const query = function(queryString, callback) {
  let urlQuery = url+'/q?'+queryString
  if (queryString === "api") urlQuery = url+"/api"
  console.log('queryString: ', queryString)
  fetch(urlQuery)
    .then(res => res.json())
    .then(respData => {      
      console.log("response Data: ", respData);
      if (callback) callback(respData)
    })
    .catch( err => {
      if (callback) callback()
    })
}

