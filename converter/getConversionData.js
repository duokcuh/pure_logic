export const getConversionData = async () => {
  
  const baseData = {
    m: 1,
    cm: 0.01,
    ft: 0.3048,
    in: 0.0254
  }
  
  let response = await fetch('newUnits.json');
  let newUnits = await response.json();
  
  return (
    { ...baseData, ...newUnits }
  )
}