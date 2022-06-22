import Population from './population.mjs';
import { MAX_GEN, THRUSTER_FACTOR } from './constants.mjs';

//userData

const incomingJSON = JSON.stringify({
  corrections: [ 1, 12, 7, 3, 4, 5, 1, 8, 11, 2, 1, 2, 1, 7, 9, 6, 1, 12, 4, 1, 7, 2, 3, 2, 1],
  cells: [ 2, 4, 4, 6, 2, 6, 8, 10, 2, 4, 2, 10, 8, 4, 6, 2, 8, 2, 4, 2, 2, 6, 4, 2, 6, 10, 10, 10, 4, 6],
});
/*  const incomingJSON = JSON.stringify({
  corrections: [1, 12, 7, 1],
  cells: [8, 4, 6, 2, 2]
});*/


const app = data => {
  
  const { corrections = [], cells = [] } = JSON.parse(data);
  if (!corrections.length || !cells.length) {
    throw new Error('Check incoming file: not enough data');
  }
  [...corrections, ...cells].forEach(elem => {
    if (!Number.isInteger(elem) || elem <= 0) {
      throw new Error('Incorrect data: only positive integer values are allowed!');
    }
  });
  
  const bestResult = corrections.reduce((a, b) => a + b);
  
  const population = new Population(corrections, cells);
  population.makePopulation();
  let successStatus = { stage: 'End', generation: MAX_GEN, status: `Maximum (${bestResult}) not reached` };
  
  for (let g = 0; g <= MAX_GEN; g++) {
    console.log('Generation: ', g, 'Best FFV: ', population.fitness_MAX.FFV, 'Average FFV: ', population.fitness_P);
    if (population.fitness_MAX.FFV === bestResult) {
      successStatus = { stage: 'Start', generation: g, status: 'Best result reached' };
      break;
    }
    
    population.doSelection();
    
    population.doCrossing();
    if (population.fitness_MAX.FFV === bestResult) {
      successStatus = { stage: 'Crossing', generation: g, status: 'Best result reached' };
      break;
    }
    
    population.doMutation();
    if (population.fitness_MAX.FFV === bestResult) {
      successStatus = { stage: 'Mutation', generation: g, status: 'Best result reached' };
      break;
    }
  }
  
  console.log('Success status: ', successStatus);
  
  const main_thruster = [];
  const sec_thruster = [];
  const others = {}; //algorithm supports more than two
  const delta_velocity = population.fitness_MAX.FFV;
  const g_len = THRUSTER_FACTOR.length;
  
  population.fitness_MAX.genes.forEach((gene, id) => {
    if (id % g_len === 0) main_thruster.push(gene);
    else if (id % g_len === 1) sec_thruster.push(gene);
    else others[id % g_len + 1] ? others[id % g_len + 1].push(gene) : others[id % g_len + 1] = [gene];
  });
  
  return JSON.stringify({ main_thruster, sec_thruster, others, delta_velocity });
}

try {
  console.log('Result: ', app(incomingJSON));
} catch (e) {
  console.log(e);
  console.log('Check incoming data: ', JSON.parse(incomingJSON));
}

