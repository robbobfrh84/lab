/*------------------------------------------------------------------------------
**********                 API / PUBNUB                     **********
------------------------------------------------------------------------------*/

var accounts;

var pubnub = PUBNUB.init({
    publish_key: 'pub-c-5b2abcc7-025c-488b-8281-c6a60cf58091',
    subscribe_key: 'sub-c-7ab5dcce-dad9-11e6-80bb-02ee2ddab7fe',
    error: function (error) {
        console.log('Error:', error);
    }
})

pubnub.subscribe({
    channel : "accounts",
    message : function (data) {
        console.log("Message Received.", data)
    },
})


getAccounts = function(){
  pubnub.history({
      channel : 'accounts',
      callback : function(m){
          console.log('hist,..',m)
          accounts = m;
          return accounts;
      },
      count : 100, // 100 is the default
      reverse : false // false is the default
  });
}


publish = function(data, chl) {
    pubnub.publish({
        channel : chl,
        message : data,
        callback : function(m){
            console.log('published',m)
        }
    })
}

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
