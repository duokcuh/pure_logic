
//multi-parameter sort supported

const sortByParams = (a, b, params, i) => {
  let result = (a[params[i]] > b[params[i]]) - (a[params[i]] < b[params[i]]);
  return (result === 0 && i < params.length ? sortByParams(a, b, params, ++i) : result)
}

export const sortRule = (list, conditions) => list.sort((a, b) => sortByParams(a, b, conditions, 0));