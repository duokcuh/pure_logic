import { getConversionData } from './getConversionData.js';
import { convert } from './convert.js';

const conversionData = await getConversionData();

const app = userData => {
  
  const { distance = {}, convert_to = null } = JSON.parse(userData);
  if (Object.keys(distance).length !== 2 || !convert_to) {
    console.warn('Check incoming file: not enough data');
    return console.log('incoming data: ', JSON.parse(userData));
  }
  
  let result = convert(distance, convert_to, conversionData);
  if (isNaN(result.value)) {
    console.warn('Incorrect units');
    console.log(`unit: ${distance.unit}, convert_to: ${convert_to}`);
    return;
  }
  console.log('result: ', JSON.stringify(result));
}

const incomingJSON = JSON.stringify({ distance: { unit: 'yd', value: 0.5 }, convert_to: 'm' });
app(incomingJSON);
