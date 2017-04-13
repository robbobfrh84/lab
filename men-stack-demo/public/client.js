// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
$(document).ready(function(){
  getIdeas();
});

function getIdeas(){
  $.get('/ideas', function(data){
    console.log(data);
    renderData(data);
  });
}

function renderData(data){
  for (var i = 0; i < data.length; i++) {
    $('ul').append('<li>' + data[i].idea + '</li>');
  }
}
