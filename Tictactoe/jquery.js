// 1.CHANGE
$("input.add").on("change", function handleChange(event){ //input is the elemnt and add is the class for both boxes to put numbers in //.on(change) will be set to an elemnt when its VALUE changes
  var left = $("input#left").val(); //changes the left input to a value so on change will work
  var right = $("input#right").val(); //changes right input to value so on change will work
  var leftVal = parseInt(left) || 0; //parses a string and returns an integer
  var rightVal = parseInt(right) || 0; //parses a string and returns an integer
  var total = leftVal + rightVal; //sets total as left integer plus right integer.
  $("#total").val(total); //the id of the box that will hold the total integer and .val() gets the VALUE from INPUT element
});

//2.CLICK
$("span").on("click", function trackClicks(event) { //calling the span //to listen for the click - so anything in any span can be //clicked by the mouse and this will happen:
  var itemText = $(this).text(); //creating a variable that text() will turn into a string. THIS is refering to each of the spans that were referred to above.
  $("ul").append("<li>" + itemText + "</li>"); //the ul is called upon to append li's with whatever the itemText string is depending on which of the spans (this) is clicked on.
});

//3.KEYPRESS
var initialPress;
var lastPress;
var totalTime; //these variables are necessary because there's no HTML classes or IDs to manipulate, we're using the actual document.

$(window).on("keypress", function theTime(event){ //the document is listening for the keyboard for a key to be pressed, then the function will:

  if(lastPress){ //this last press conditional says if its the last press on the key board:
      totalTime = (event.timeStamp - lastPress)/1000; //apply the total time variable call the event and apply a time stamp and subtract the time of the last press from when it was initially pressed and divide by 1000 to convert into seconds.
      $("#total-time").append(" " + totalTime + " "); //append the total time onto the span.
  }else{
    $("#total-time").append("Click the keyboard"); //tell the user to click the keyboard to initiate the first press.
  }
  lastPress = event.timeStamp; //make sure that if the keyboard has been pressed once, that the time stamp records to the lastPress variable once the key is pressed a second time.
});

//4.READY
