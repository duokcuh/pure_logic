

export const includeRule = (list, conditions) => list.filter(item => {
  //use .some if one match is enough
  return conditions.every(elem => {
    let [key, value] = Object.entries(elem)[0];
    return item[key] === value;
  });
})