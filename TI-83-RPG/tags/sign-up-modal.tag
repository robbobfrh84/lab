<sign-up-modal>
  <div class="ui button custom-button custom-button-2" onclick={ showMore }>Sign Up</div>
  <div id='signUpModal' class="ui basic modal">
    <div class="ui right aligned header">
      <div class="actions">
        <div class="ui red deny button custom-button x-button">
          <i class="remove icon"/>
        </div>
      </div>
    </div>
    <h1 class="ui center aligned header"> Create New Account </h1>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='enterEmail' class='custom-inverted-input create-email-details' placeholder='Enter Email...' onkeyup={ changeInputField }></input>
      </div>
    </div>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='enterUserName' class='custom-inverted-input create-user-details' placeholder='UserName...' onkeyup={ changeInputField }></input>
      </div>
    </div>
    <br/>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='enterPassword' type='password' class='custom-inverted-input' placeholder='Enter Password' onkeyup={ changeInputField }></input>
      </div>
    </div>
    <div class="ui center aligned header">
      <div class='ui input'>
        <input id='reEnterPassword' type='password' class='custom-inverted-input' placeholder='Re-Enter Password' onkeyup={ requestAccount }></input>
      </div>
    </div>
    <div class="ui center aligned header">
      <div class="ui green ok inverted button" onclick={ requestAccont }>Go</div>
    </div>
    <br/>
  </div>
  <script>

  this.on('mount', function(){
    this.button = $('.ui.basic.modal', this.root);
  })

  requestAccount(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault(); // Ensure it is only this code that runs
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
  }

  changeInputField(e){
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
  }

  showMore() {
    this.button.modal('show')
    var accounts = getAccounts()
    console.log('accounts', accounts)
	}

  </script>
</sign-up-modal>
