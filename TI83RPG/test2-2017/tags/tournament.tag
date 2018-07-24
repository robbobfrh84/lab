<tournament>
    <div class="right item">
      <div class="ui action input">
        <input id='inputText' type='text' placeholder=Contenders... onkeyup={ buildBracket } >
        <div class="ui button" onclick={ buildBracket }>Go</div>
      </div>
    </div>
    <br><hr><br>
    <span each={ matchup in bracket }>
      <div if={ matchup.length }>
        { matchup } -
      </div>
      <span if={ !matchup.length}>
        ------ { matchup } <br>
      </span>
    </span>
  <script>

  this.on('mount', function(){
    this.bracket = [1,2]
  })

  place(seed){
    var lowSeed = this.bracket[0];
    var lowSeedIndex = 0;
    for (var i = 0; i < this.bracket.length; i++) { // Don't think we have to start @ index-0
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

  buildBracket(e){
    if(e.keyCode === 13 || e.type === 'click'){
      e.preventDefault(); // Ensure it is only this code that runs
      this.contenders = inputText.value;
      for (var i = 3; i <= this.contenders; i++) {
        this.place(i)
      }
      console.log(this.contenders,'Contender Bracket('+this.bracket.length*2+')',this.bracket)
    }
  }

  </script>
</tournament>
