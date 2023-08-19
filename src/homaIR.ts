export type HomaIrInterpretation =
  | 'insulin sensitive'
  | 'insulin resistance'
  | 'significant insulin resistance';
/**
 * HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) is a method for
 * assessing insulin resistance.
 * @param opts `{ insulin: number, glucose: number, fasting: boolean, decimalPlaces?: number}`
 * `insulin` should be provided in units of uIU/mL, glucose in mg/dL, `fasting` is a boolean
 * indicating whether the insulin and glucose values were obtained while fasting, and
 * `decimalPlaces` is an optional number of decimal places to round the result to. Default
 * there is no rounding.
 * @returns an object containing the HOMA-IR value as the property `value` and and
 * interpretation as the property `interpretation`.
 * @throws {RangeError} if glucose is less than or equal to zero.
 * @throws {RangeError} if insulin is less than or equal to zero.
 * @throws {Error} if fasting is false.  The fasting state is critical to this calculation.
 */
export const homaIR = (opts: {
  insulin: number;
  glucose: number;
  fasting: boolean;
  decimalPlaces?: number;
}): {
  value: number;
  interpretation: HomaIrInterpretation;
  warnings: string[];
} => {
  const { insulin, glucose, fasting, decimalPlaces } = opts;

  if (!fasting) {
    throw new Error('HOMA-IR is only valid for fasting insulin and glucose');
  }
  if (insulin <= 0) {
    throw new RangeError('Insulin must be a value greater than zero.');
  }
  if (glucose <= 0) {
    throw new RangeError('Glucose must be a value greater than zero.');
  }
  if (decimalPlaces && decimalPlaces < 0) {
    throw new RangeError('decimalPlaces must be a positive integer.');
  }

  const warnings: string[] = [];

  if (insulin > 25) {
    warnings.push(
      'Insulin levels above 25 uIU/mL are outside of the normal range.'
    );
  }

  if (glucose > 125) {
    warnings.push(
      'Glucose levels above 125 mg/dL are strong indicators of insulin resistance.'
    );
  }
  if (glucose >= 100 && glucose <= 125) {
    warnings.push(
      'Glucose levels between 100 and 125 mg/dL suggest possible insulin resistance.'
    );
  }
  if (glucose < 70 && glucose >= 54) {
    warnings.push(
      'Glucose levels below 70 mg/dL are hypoglycemic and require urgent attention.'
    );
  }
  if (glucose < 54) {
    warnings.push(
      'Glucose levels below 54 mg/dL are severely hypoglycemic and require immediate attention.'
    );
  }

  const value = (insulin * glucose) / 405;

  let interpretation: HomaIrInterpretation;
  if (value < 1) {
    interpretation = 'insulin sensitive';
  } else if (value >= 1 && value <= 2) {
    interpretation = 'insulin resistance';
  } else {
    interpretation = 'significant insulin resistance';
  }

  return {
    value: decimalPlaces ? parseFloat(value.toFixed(decimalPlaces)) : value,
    interpretation,
    warnings,
  };
};
