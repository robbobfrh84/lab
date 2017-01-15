riot.tag2('main', '<svg xmlns="http://www.w3.org/2000/svg" id="universe" width="100vw" height="100vh"></svg> <div id="cosmos"> <div class="ui massive secondary pointing menu"> <a id="TI-83-RPG" class="active item pageSwap" onclick="{pageSwap.bind(this,\'landingPage\')}"> <h2> TI-83-RPG </h2> </a> <a id="backStoryIcon" class="item pageSwap" onclick="{pageSwap.bind(this,\'backStoryPage\')}"> <img src="resources/backstory.svg" height="60px"> </a> <a id="globeIcon" class="item pageSwap" onclick="{pageSwap.bind(this,\'communityPage\')}"> <i class="big brown globe icon"></i> </a> <div class="right menu"> <div class="ui dropdown item"> <img src="resources/home.svg" height="30px"> <i class="dropdown icon"></i> <div class="menu"> <a class="item drop-down" onclick="{pageSwap.bind(this,\'addFighterPage\')}"> <img id="addFighterIcon" src="resources/warrior.svg"> &nbsp;&nbsp;&nbsp;&nbsp; New Fighter</a> <a class="item drop-down" onclick="{pageSwap.bind(this,\'viewFightersPage\')}"> <i class="list layout icon"></i> View Fighters</a> <a class="item drop-down" onclick="{pageSwap.bind(this,\'tournamentPage\')}"> <img id="tournamentIcon" src="resources/tournament.svg" height="20px !important"> &nbsp;&nbsp;&nbsp; Tournament</a> <a class="item drop-down" onclick="{pageSwap.bind(this,\'sparPage\')}"> <img id="sparIcon" src="resources/spar.svg"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Spar</a> </div> </div> <div class="item"> <sign-in-modal></sign-in-modal> <sign-up-modal></sign-up-modal> </div> </div> </div> <div id="landingPage" class="item"> </div> <div id="backStoryPage" class="item hidden"> This is the back story.... </div> <div id="communityPage" class="item hidden"> Global Community of Worlds! </div> <div id="addFighterPage" class="item hidden"> Add Fighter </div> <div id="viewFightersPage" class="item hidden"> View Fighters </div> <div id="tournamentPage" class="item hidden"> Tournament Page <tournament></tournament> </div> <div id="sparPage" class="item hidden"> Spar Page </div> </div>', '', '', function(opts) {

    var lastPage = this.landingPage

    this.pageSwap = function(e){
      lastPage.className = 'item hidden';
      var newPage = document.getElementById(e);
      newPage.className = 'item';
      lastPage = newPage;
    }.bind(this)

});

riot.tag2('sign-in-modal', '<div class="ui brown inverted button" onclick="{showMore}">Sign In</div> <div class="ui basic modal"> <div class="ui right aligned header"> <div class="actions"> <div class="ui red deny button custom-button x-button"> <i class="remove icon"></i> </div> </div> </div> <h1 class="ui center aligned header"> Sign In </h1> <div class="ui center aligned header"> <div class="ui input"> <input id="userName" class="custom-inverted-input create-user-details" placeholder="UserName..." onkeyup="{changeInputField}"></input> </div> </div> <div class="ui center aligned header"> <div class="ui input"> <input id="password" type="password" class="custom-inverted-input" placeholder="Password..." onkeyup="{login}"></input> </div> </div> <div class="ui center aligned header"> <div class="ui green ok inverted button" onclick="{login}">Go</div> </div> <br> <div class="ui center aligned header"> <div class="actions"> <div class="ui deny button big custom-button" onclick="{openSignUp}"> <i class="large globe icon"></i> Don\'t have an account? &nbsp;&nbsp; Sign Up </div> </div> </div> </div>', '', '', function(opts) {

  this.on('mount', function(){
    this.button = $('.ui.basic.modal', this.root);
  })

  this.login = function(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault();
      this.userName = userName.value;
      this.password = password.value;
      console.log('UserName:',this.userName+',  Pass:',this.password);
    }
  }.bind(this)

  this.changeInputField = function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      password.focus();
    }
  }.bind(this)

  this.showMore = function() {
    this.button.modal('show')
    this.update();
	}.bind(this)

  this.openSignUp = function(){
    console.log('open sign up');
    $('#signUpModal').modal('show');
  }.bind(this)

});

riot.tag2('sign-up-modal', '<div class="ui button custom-button custom-button-2" onclick="{showMore}">Sign Up</div> <div id="signUpModal" class="ui basic modal"> <div class="ui right aligned header"> <div class="actions"> <div class="ui red deny button custom-button x-button"> <i class="remove icon"></i> </div> </div> </div> <h1 class="ui center aligned header"> Create New Account </h1> <div class="ui center aligned header"> <div class="ui input"> <input id="enterEmail" class="custom-inverted-input create-email-details" placeholder="Enter Email..." onkeyup="{changeInputField}"></input> </div> </div> <div class="ui center aligned header"> <div class="ui input"> <input id="enterUserName" class="custom-inverted-input create-user-details" placeholder="UserName..." onkeyup="{changeInputField}"></input> </div> </div> <br> <div class="ui center aligned header"> <div class="ui input"> <input id="enterPassword" type="password" class="custom-inverted-input" placeholder="Enter Password" onkeyup="{changeInputField}"></input> </div> </div> <div class="ui center aligned header"> <div class="ui input"> <input id="reEnterPassword" type="password" class="custom-inverted-input" placeholder="Re-Enter Password" onkeyup="{requestAccount}"></input> </div> </div> <div class="ui center aligned header"> <div class="ui green ok inverted button" onclick="{requestAccont}">Go</div> </div> <br> </div>', '', '', function(opts) {

  this.on('mount', function(){
    this.button = $('.ui.basic.modal', this.root);
  })

  this.requestAccount = function(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault();
      this.email = enterEmail.value;
      this.userName = enterUserName.value;
      this.pass1 = enterPassword.value;
      this.pass2 = reEnterPassword.value;
      console.log('Email:',this.email,'UserName:',this.userName);
      console.log('UserName:',this.pass1,'Pass:',this.pass2);
      var accountRequest = {
          userName : this.userName,
          email : this.email,
          pass1 : this.pass1
      }
      publish(accountRequest ,'accounts')
    }
  }.bind(this)

  this.changeInputField = function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      var pre = e.srcElement.id
      var inputs = document.getElementsByTagName("input");
      for(var i = 0; i < inputs.length;i++) {
        if(inputs[i].id === pre) {
          document.getElementById(inputs[i+1].id).focus();
          break
        }
      }
    }
  }.bind(this)

  this.showMore = function() {
    this.button.modal('show')
    var accounts = getAccounts()
    console.log('accounts', accounts)
	}.bind(this)

});

riot.tag2('tournament', '<div class="right item"> <div class="ui action input"> <input id="inputText" type="text" placeholder="Contenders..." onkeyup="{buildBracket}"> <div class="ui button" onclick="{buildBracket}">Go</div> </div> </div> <br><hr><br> <span each="{matchup in bracket}"> <div if="{matchup.length}"> {matchup} - </div> <span if="{!matchup.length}"> ------ {matchup} <br> </span> </span>', '', '', function(opts) {

  this.on('mount', function(){
    this.bracket = [1,2]
  })

  this.place = function(seed){
    var lowSeed = this.bracket[0];
    var lowSeedIndex = 0;
    for (var i = 0; i < this.bracket.length; i++) {
      if (this.bracket[i] > lowSeed){
        lowSeed = this.bracket[i]
        lowSeedIndex = i
      }
    }
    this.bracket[lowSeedIndex] = [lowSeed, seed]
    if (lowSeedIndex === 0 && this.contenders !== seed){
      this.bracket = [].concat.apply([],this.bracket)
    }

  }.bind(this)

  this.buildBracket = function(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault();
      this.contenders = inputText.value;
      for (var i = 3; i <= this.contenders; i++) {
        this.place(i)
      }
      console.log(this.contenders,'Contender Bracket('+this.bracket.length*2+')',this.bracket)
    }
  }.bind(this)

});
