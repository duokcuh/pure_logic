import { makePaths } from './makePaths.mjs';

const app = userData => {
  
  let data = JSON.parse(userData) || [];
  if (!data.length) {
    console.warn('Check incoming file: not enough data');
    return console.log('incoming data: ', JSON.parse(userData));
  }
  
  let list;
  try {
    list = makePaths(data);
  } catch (e) {
    e.status = 'Error with data processing. Check JSON.';
    throw e
  }
  
  console.log(JSON.stringify({
    paths: {
      number: list.length,
      list
    }
  }));
}

//incoming data examples
const incomingJSON = JSON.stringify([
  { question: 'What is your marital status?', answers: [{ value: 'Single', next: 1 }, { value: 'Married', next: 2 }] },
  { question: 'Are you planning on getting married next year?', answers: [{ value: 'Yes' }, { value: 'No' }] },
  {
    question: 'How long have you been married?',
    answers: [{ value: 'Less than a year' }, { value: 'More than a year', next: 3 }]
  },
  { question: 'Have you celebrated your one year anniversary?', answers: [{ value: 'Yes' }, { value: 'No' }] }
]);

const occupierDetectorJSON = JSON.stringify([
  { question: 'Кто по национальности?', answers: [{ value: 'Українець', next: 1 }, { value: 'Русский:(', next: 4 }] },
  { question: '... ла-ла-ла-ла-ла ла-ла-ла', answers: [{ value: 'Красивая мелодия' }, { value: 'Путін - Х*ЙЛО', next: 2 }] },
  { question: 'Коли воли не ревуть?', answers: [{ value: 'Коли їх не б\'ють' }, { value: 'Коли ясла повні', next: 3 }] },
  { question: 'Олені, олені ...', answers: [{ value: 'Це про русню, мабудь' }, { value: 'Не бриті і не голені', next: 4 }] },
  { question: 'Вам нравится на Украине?', answers: [{ value: 'Не НА а В!', next: 5 }, { value: 'Да, красивая природа' }] },
  { question: 'Есть ли в Украине фашисты?', answers: [{ value: 'Да - пришли из россии', next: 6 }, { value: 'Нет', next: 6 }] },
  { question: 'Чей крым?', answers: [{ value: 'Наш' }, { value: 'Крим - це Україна!', next: 7 }] },
  { question: 'Доброго вечора', answers: [{ value: 'Ми з України' }, { value: 'Героям слава!' }] },
]);

try {

app(occupierDetectorJSON);

} catch (e) {
  console.log('Error in app: ', e);
}
