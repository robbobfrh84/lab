<main>
  <svg xmlns="http://www.w3.org/2000/svg" id='universe' width=100vw height=100vh></svg>
  <div id='cosmos'>
    <div class="ui massive secondary pointing menu">
      <a id='TI-83-RPG' class="active item pageSwap" onclick={ pageSwap.bind(this,'landingPage') }>
        <h2> TI-83-RPG </h2>
      </a>
      <a id='backStoryIcon' class="item pageSwap" onclick={ pageSwap.bind(this,'backStoryPage') }>
        <img src='resources/backstory.svg' height='60px'/>
      </a>
      <a id='globeIcon' class="item pageSwap" onclick={ pageSwap.bind(this,'communityPage') }>
        <i class="big brown globe icon"></i>
      </a>
      <div class="right menu">
        <div class="ui dropdown item">
          <img src='resources/home.svg' height='30px'/>
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item drop-down" onclick={ pageSwap.bind(this,'addFighterPage') }>
              <img id='addFighterIcon' src='resources/warrior.svg'/>
              &nbsp;&nbsp;&nbsp;&nbsp; New Fighter</a>
            <a class="item drop-down" onclick={ pageSwap.bind(this,'viewFightersPage') }>
              <i class="list layout icon"></i>
              View Fighters</a>
            <a class="item drop-down" onclick={ pageSwap.bind(this,'tournamentPage') }>
              <img id='tournamentIcon' src='resources/tournament.svg' height='20px !important'/>
              &nbsp;&nbsp;&nbsp; Tournament</a>
            <a class="item drop-down" onclick={ pageSwap.bind(this,'sparPage') }>
              <img id='sparIcon' src='resources/spar.svg'/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Spar</a>
          </div>
        </div>
        <div class="item">
          <sign-in-modal></sign-in-modal>
          <sign-up-modal></sign-up-modal>
        </div>
      </div>
    </div>
<!-- *************************************  DROPDOWN  *************************************** -->
    <div id='landingPage' class='item'>
    </div>
    <div id='backStoryPage' class='item hidden'>
      This is the back story....
    </div>
    <div id='communityPage' class='item hidden'>
      Global Community of Worlds!
    </div>
    <div id='addFighterPage' class='item hidden'>
      Add Fighter
    </div>
    <div id='viewFightersPage' class='item hidden'>
      View Fighters
    </div>
    <div id='tournamentPage' class='item hidden'>
      Tournament Page
      <tournament></tournament>
    </div>
    <div id='sparPage' class='item hidden'>
      Spar Page
    </div>
  </div>
  <script>

    var lastPage = this.landingPage

    pageSwap(e){ // CONSIDER using riot to control pages within this Single Page App to replace Ids. could use show={ } and build an object that switches control between pages. 
      lastPage.className = 'item hidden';
      var newPage = document.getElementById(e);
      newPage.className = 'item';
      lastPage = newPage;
    }.bind(this)

  </script>
</main>
