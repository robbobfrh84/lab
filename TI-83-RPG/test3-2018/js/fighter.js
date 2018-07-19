class Fighter {

  constructor (set, id) {
    this.name = set.name || null,
    this.id = 'TI#'+id,
    this.gender = set.gender || null,
    this.age = set.age || _rand(18,40),
    this.skills = this.buildSkills(set.skills),
    this.rating = this.getRating(this.skills),
    this.record = { win : 0, loss : 0 },
    this.status = 'active'
  }

  buildSkills (set) {
    if (!set) set = {}
    return {
      speed : set.speed || _rand(0,10),
      strangth : set.strangth || _rand(0,10),
      experience : set.experience || _rand(0,4), // 🚨 NOTE! starting out with limited experience!
      intelligence : set.intelligence || _rand(0,10),
      willPower : set.willPower || _rand(0,10)
    }
  }

  getRating (obj) {
    var all = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        all.push(obj[key]);
      }
    }
    return Math.round(((all.reduce(function add(a, b){return a+b}, 0))/all.length)*10)/10
  }

}
