const { homaIR } = require('./dist/');

const { value, interpretation } = homaIR({
  glucose: 100,
  insulin: 10,
  fasting: true,
});

console.log(`HOMA-IR: ${value} (${interpretation})`);
