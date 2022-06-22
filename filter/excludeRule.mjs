

export const excludeRule = (list, conditions) => list.filter(item => {
  //use .every if one match is not enough
  return !conditions.some(elem => {
    let key = Object.keys(elem)[0];
    return item[key] === elem[key];
  });
})