/*------------------------------------------------------------------------------
**********                      API / MyJson                          **********
------------------------------------------------------------------------------*/

var myJsonUrl = 'https://api.myjson.com/bins';
var userUri = 'https://api.myjson.com/bins/ublxl'; //AFTER CREATING a new URI, past uir here...
var newAccounts = JSON.stringify({ users : {}, data : {}, });
var accounts;

//This function will take an object, convert it into a string, and create a NEW Json from MyJson.com
postMyJson = function(obj, url){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
          var returnData = JSON.parse(xhr.responseText);
          console.log('New JSON url: ', returnData.uri, 'New Created JSON Object: ', obj);
      }
  }
  xhr.send(obj);
}

getMyJson = function(uri, callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          callback(JSON.parse(xhr.responseText), uri);
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

updateAccontsApi = function(data, uri){
  accounts = data
  console.log('accounts',accounts);
  //putMyJson(data, uri)
}
//postMyJson(newAccounts, myJsonUrl);
getMyJson(userUri, updateAccontsApi);

/*------------------------------------------------------------------------------
**********               Semantic jQuery Functions                    **********
------------------------------------------------------------------------------*/

$(document).ready(function() {
  $('.ui.menu .ui.dropdown').dropdown({
    on: 'hover'
  });
  $('.ui.menu a.item').on('click', function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
  });
});
