var _DATA = {}

var _FALLBACK_DATA = {"home":{"testy":"WE GOT OUR JSON!","array":["How","are","you?"]},"page2":{"athing":"something","testy":"'Sup Earthlings???","feet":["5","3","4","12"]},"add":["test note","Another Note"]}

var _PERSONAL_URI = 'https://api.myjson.com/bins/cekih'; //AFTER CREATING a new URI, past uir here...
var myJsonUrl = 'https://api.myjson.com/bins';
var json;

//This function will take an object, convert it into a string, and create a NEW Json from MyJson.com
postMyJson = function(obj){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", myJsonUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
          var returnData = JSON.parse(xhr.responseText);
          console.log('New _PERSONAL_URI: ', returnData.uri, 'New Created JSON Object: ', obj);
      }
  }
  xhr.send(obj);
}

getMyJson = function(uri){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          json = JSON.stringify(xhr.responseText);
          apiCallback(JSON.parse(xhr.responseText), uri);
      }
  }
  xhr.open('GET', uri, true);
  xhr.send(null);
}

putMyJson = function(data, uri){
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', uri);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
          var json = JSON.stringify(xhr.responseText);
          console.log('NEW API: ', data);
      }
  };
  xhr.send(JSON.stringify(data));
}

apiCallback = function(data, uri){
  _DATA = data
  for (const component of _COMPONENTS_STORED_GLOBALLY) {
    if (component.hasAttribute('serve')) {
      const serve = component.getAttribute('serve')
      component.setAttribute('served', JSON.stringify(_DATA))
    }
  }
}
// postMyJson(JSON.stringify(_FALLBACK_DATA));
getMyJson(_PERSONAL_URI);
