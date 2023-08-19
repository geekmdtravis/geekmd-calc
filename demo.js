const { homaIR } = require('./dist/');

// Produces both a value and an interpretation for the user
const { value, interpretation } = homaIR({
  glucose: 100,
  insulin: 10,
  fasting: true,
});

console.log(`HOMA-IR: ${value} (${interpretation})`);

// Throws errors for invalid inputs
try {
  homaIR({
    glucose: 0,
    insulin: 0,
    fasting: false,
  });
} catch (e) {
  console.error(`Error: ${e.message}`);
}
