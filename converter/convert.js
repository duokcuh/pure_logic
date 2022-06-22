
export const convert = ({ unit, value }, convert_to, conversion) => {
  
  const converted = +(value * conversion[unit] / conversion[convert_to]).toFixed(2);
  
  return ({ unit: convert_to, value: converted })
  
}