const { homaIR } = require('./dist/');

// Produces both a value and an interpretation for the user
const { value, interpretation } = homaIR({
  glucose: 100,
  insulin: 10,
  fasting: true,
});

console.log(`HOMA-IR: ${value} (${interpretation})`);

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

function generateHomaIrError({ glucose, insulin, fasting }) {
  try {
    homaIR({ glucose, insulin, fasting });
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}
