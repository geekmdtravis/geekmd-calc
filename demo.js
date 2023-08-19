const { homaIR } = require('./dist/');

// Produces both a value and an interpretation for the user
const { value: val1, interpretation: interp1 } = homaIR({
  glucose: 100,
  insulin: 10,
  fasting: true,
});

console.log(`HOMA-IR: ${val1} (${interp1})`);

// allows you to round to a specified number of decimal places
const { value: val2, interpretation: interp2 } = homaIR({
  glucose: 100,
  insulin: 10,
  fasting: true,
  decimalPlaces: 1,
});

console.log(`HOMA-IR: ${val2} (${interp2})`);

// includes warnings
const { warnings } = homaIR({
  glucose: 47,
  insulin: 27,
  fasting: true,
});

console.log('Warnings:\n====================');
console.log(warnings.join('\n'));
console.log('====================');
// Throws an error if not fasting
generateHomaIrError({
  glucose: 100,
  insulin: 10,
  fasting: false,
});

// Throws an error if glucose is less than or equal to 0
generateHomaIrError({
  glucose: 100,
  insulin: 0,
  fasting: true,
});

// Throws an error if insulin is less than or equal to 0
generateHomaIrError({
  glucose: 0,
  insulin: 10,
  fasting: true,
});

// Throws an error if decimalPlaces is a negative value
generateHomaIrError({
  glucose: 100,
  insulin: 10,
  fasting: true,
  decimalPlaces: -1,
});

function generateHomaIrError({ glucose, insulin, fasting, decimalPlaces }) {
  try {
    homaIR({ glucose, insulin, fasting, decimalPlaces });
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}
