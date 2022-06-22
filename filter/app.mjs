import { includeRule } from './includeRule.mjs';
import { excludeRule } from './excludeRule.mjs';
import { sortRule } from './sortRule.mjs';

//rules
const EXCLUDE = 'exclude';
const INCLUDE = 'include';
const SORT_BY = 'sort_by';

const app = userData => {
  
  let { data = [], condition = {} } = JSON.parse(userData);
  if (!data.length || !Object.keys(condition).length) {
    console.warn('Check incoming file: not enough data');
    return console.log('incoming data: ', JSON.parse(userData));
  }
  
  if (condition[EXCLUDE]) data = excludeRule(data, condition[EXCLUDE]);
  if (condition[INCLUDE]) data = includeRule(data, condition[INCLUDE]);
  if (condition[SORT_BY]) data = sortRule(data, condition[SORT_BY]);
  
  console.log(JSON.stringify({result: data }));
}

//incoming data example
const incomingJSON = JSON.stringify({
  data:
    [
      { user: 'mike@mail.com', rating: 20, disabled: false },
      { user: 'serg@mail.com', rating: 14, disabled: false },
      { user: 'greg@mail.com', rating: 14, disabled: false },
      { user: 'john@mail.com', rating: 25, disabled: true },
      { user: 'serg@mail.com', rating: 14, disabled: false },
    ],
  condition:
    { exclude: [{ disabled: true }], sort_by: ['rating'] }
});
app(incomingJSON);
