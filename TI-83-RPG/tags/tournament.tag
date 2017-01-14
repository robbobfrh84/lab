<tournament>
  <div>
    <input cvalue='4'></input>
    <button class='input' value='4'>GO</button>
    <br><hr><br>
    <span each={ matchup in bracket }>
      <div if={ matchup.length }>
        { matchup } -
      </div>
      <span if={ !matchup.length}>
        ------ { matchup } <br>
      </span>
    </span>

  </div>
  <script>

  this.on('mount', function(){
    this.contenders = 25
    this.bracket = [1,2]
    this.buildBracket()
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

  buildBracket(){
    for (var i = 3; i <= this.contenders; i++) {
      this.place(i)
    }
    console.log('bracket: ',this.bracket)
    console.log('bracket size: ', this.bracket.length*2,'contenders.');
  }.bind(this)


  </script>
</tournament>
