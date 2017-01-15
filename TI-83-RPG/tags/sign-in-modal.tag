<sign-in-modal>
  <div class="ui brown inverted button" onclick={ showMore } >Sign In</div>
  <div class="ui basic modal">
    <div class="ui right aligned header">
      <div class="actions">
        <div class="ui red deny button custom-button x-button">
          <i class="remove icon"/>
        </div>
      </div>
    </div>
    <h1 class="ui center aligned header"> Sign In </h1>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='userName' class='custom-inverted-input create-user-details' placeholder='UserName...' onkeyup={ changeInputField }></input>
      </div>
    </div>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='password' type='password' class='custom-inverted-input' placeholder='Password...' onkeyup={ login }></input>
      </div>
    </div>
    <div class="ui center aligned header">
      <div class="ui green ok inverted button" onclick={ login }>Go</div>
    </div>
    <br/>
    <div class="ui center aligned header">
      <div class='actions'>
        <div class="ui deny button big custom-button" onclick={ openSignUp }>
          <i class="large globe icon"></i>
          Don't have an account? &nbsp;&nbsp; Sign Up
        </div>
      </div>
    </div>
  </div>
  <script>

  this.on('mount', function(){
    this.button = $('.ui.basic.modal', this.root);
  })

  login(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault(); // Ensure it is only this code that runs
      this.userName = userName.value;
      this.password = password.value;
      console.log('UserName:',this.userName+',  Pass:',this.password);
    }
  }

  changeInputField(e){
    if(e.keyCode === 13){
      e.preventDefault();
      password.focus();
    }
  }

  showMore() {
    this.button.modal('show')
    this.update();
	}

  openSignUp(){
    console.log('open sign up');
    $('#signUpModal').modal('show');
  }

  </script>
</sign-in-modal>
