import {
  BOOSTS,
  CROSSOVER_CHANCE,
  ELITE,
  MUTATION_CHANCE,
  MUTATION_CHANCE_G,
  SELECT,
  SIZE,
  THRUSTER_FACTOR
} from './constants.mjs';


export default class Population {
  
  constructor(limits, cells) {
    this.limits = limits;
    this.store = this.orderCells(cells);
    this.population = [];
  }
  
  //average population FFV
  get fitness_P() {
    return +(this.population.reduce((a, b) => a + b.FFV, 0) / SIZE).toFixed(2);
  }
  
  //max FFV chromosome
  get fitness_MAX() {
    this.population.sort((a, b) => b.FFV - a.FFV);
    return this.population[0];
  }
  
  orderCells = cells => {
    const ordered = Array(BOOSTS.length - 1).fill(0);
    cells.forEach(elem => {
      if (!elem) return;
      let id = BOOSTS.indexOf(elem);
      ordered[id] += 1;
    });
    return ordered;
  }
  
  makePopulation() {
    for (let i = 0; i < SIZE; i++) {
      this.population.push(this.makeChromosome());
    }
  }
  
  makeChromosome() {
    const genes = this.limits.flatMap(item => this.makeGene(item));
    const FFV = this.fitness(genes);
    return { genes, FFV };
  }
  
  makeGene(limit) {
    let gene = [];
    do {
      gene = THRUSTER_FACTOR.map(() => BOOSTS[Math.floor(Math.random() * BOOSTS.length)]);
    }
    while (gene.reduce((a, b, id) => a + b * THRUSTER_FACTOR[id], 0) > limit);
    return gene;
  }
  
  //fitness function
  fitness = genes => {
    const usedCells = this.orderCells(genes);
    let penalty = 0;
    usedCells.forEach((elem, id) => {
      let delta = this.store[id] - usedCells[id];
      if (delta < 0) penalty += delta;
    });
    return (
      penalty || genes.reduce((a, b, id) => a + b * THRUSTER_FACTOR[id % THRUSTER_FACTOR.length], 0)
    );
  }
  
  //GA methods
  doSelection = () => {
    const nextGen = [];
    this.population.sort((a, b) => b.FFV - a.FFV);
    for (let id = 0; id < ELITE; id++) {
      nextGen.push(this.population[id])
    }
    
    for (let i = 0; i < SIZE - ELITE; i++) {
      const ids = new Set;
      do { ids.add(Math.floor(Math.random() * SIZE)) }
      while (ids.size < SELECT);
      
      const challengers = [...ids].map(id => this.population[id]).sort((a, b) => b.FFV - a.FFV);
      //clone winner
      const { genes, FFV } = challengers[0];
      nextGen.push({ genes: [...genes], FFV });
    }
    
    this.population = nextGen;
  }
  
  doCrossing = () => {
    const ids = new Set;
    do { ids.add(Math.floor(Math.random() * SIZE)) }
    while (ids.size < SIZE);
    
    for (let i = 0; i < SIZE; i += 2) {
      if (Math.random() >= CROSSOVER_CHANCE) continue;
      const parents = [this.population[[...ids][i]], this.population[[...ids][i + 1]]];
      const g_len = THRUSTER_FACTOR.length;
      const pos = g_len * (Math.floor(Math.random() * (this.limits.length - 1)) + 1);
      const parts = parents.map(parent => parent.genes.splice(pos));
      
      parents.forEach((parent, id) => {
        parent.genes = [...parent.genes, ...parts[+!id]];
        parent.FFV = this.fitness(parent.genes);
      });
    }
  }
  
  doMutation = () => {
    const g_len = THRUSTER_FACTOR.length;
    
    this.population.forEach(chromo => {
      if (Math.random() >= MUTATION_CHANCE) return;
      for (let pos = 0; pos < chromo.genes.length; pos += g_len) {
        if (Math.random() >= MUTATION_CHANCE_G) continue;
        chromo.genes.splice(pos, g_len, ...this.makeGene(this.limits[pos / g_len]));
        chromo.FFV = this.fitness(chromo.genes);
      }
    });
  }
}