const Evolve_units = {

  getInitialUnits: function(staticUnits) {
    this.cnt = staticUnits.length
    this.staticUnits = staticUnits
    this.genome = this.createGenome()
    this.buildInitalUnits(this.genome, this.cnt)
  },

  createGenome: function(){
    const unitGenome = EV.addGenome("unit","asexual")
    //Size
    EV.addGene(unitGenome, "sizeX", "complete", "count", 2, 1, 2, 1, 4)
    EV.addGene(unitGenome, "sizeY", "complete", "count", 2, 1, 2, 1, 4)
    // Border
    EV.addGene(unitGenome, "border", "complete", "count", 4, 1, 2, 0, null)
    EV.addGene(unitGenome, "borderRadius", "complete", "count", 4, 1, 2, 0, null)
    // COLOR
    EV.addGene(unitGenome, "red", "complete", "count", 100, 1, 20, 0, 255)
    EV.addGene(unitGenome, "green", "complete", "count", 149, 1, 20, 0, 255)
    EV.addGene(unitGenome, "blue", "complete", "count", 237, 1, 20, 0, 255)
    // Border Color
    EV.addGene(unitGenome, "bred", "complete", "count", 230, 1, 20, 200, 255)
    EV.addGene(unitGenome, "bgreen", "complete", "count", 230, 1, 20, 200, 255)
    EV.addGene(unitGenome, "bblue", "complete", "count", 230, 1, 20, 200, 255)
    return unitGenome
  },

  buildInitalUnits: function(genome, cnt) {
    for (var i = 0; i < cnt; i++) {
      const newUnit = EV.newRandomizedFirstGenGenotype(genome)
      Units.push(new this.Unit(newUnit, this.staticUnits[i]))
    }
  },

  Unit: function(genotype, static) {
    this.genotype = genotype
    this.phenotype = EV.generatePhenotype( this.genotype )
    this.static = static

    this.sizeX = this.phenotype.sizeXValue
    this.sizeY = this.phenotype.sizeYValue

    this.border = this.phenotype.borderValue
    this.borderRadius = this.phenotype.borderRadiusValue

    this.color = [
      this.phenotype.redValue,
      this.phenotype.greenValue,
      this.phenotype.blueValue
    ]
    this.borderColor = [
      this.phenotype.bredValue,
      this.phenotype.bgreenValue,
      this.phenotype.bblueValue
    ]
  },

  createDecendant: function(parent) {
    var childUnit = EV.meiosis(
      this.genome,
      parent.genotype,
    )
    Units.push( new this.Unit( childUnit, parent.static ) )
  }

}
