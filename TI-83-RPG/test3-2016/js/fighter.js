class Fighter {

  constructor (set) {
    this.name = set.name || null,
    this.gender = set.gender || null,
    this.age = set.age || random(18,40),
    this.skills = this.buildSkills(set.skills),
    this.rating = this.getRating(this.skills)
  }

  buildSkills (set) {
    if (!set) set = {}
    return {
      speed : set.speed || random(0,100),
      strangth : set.strangth || random(0,100),
      experience : set.experience || random(0,100),
      intelligence : set.intelligence || random(0,100),
      endurance : set.endurance || random(0,100),
      coaching : set.coaching || random(0,100),
      willPower : set.willPower || random(0,100)
    }
  }

  getRating (obj) {
    var all = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        all.push(obj[key]);
      }
    }
    return Math.round(((all.reduce(function add(a, b){return a+b}, 0))/all.length)*10)/100
  }

}
