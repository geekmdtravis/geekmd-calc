export type HomaIrInterpretation =
  | 'insulin sensitive'
  | 'insulin resistance'
  | 'significant insulin resistance';
/**
 * HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) is a method for
 * assessing insulin resistance.
 * @param opts { insulin: number, glucose: number, fasting: boolean}
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
}): {
  value: number;
  interpretation: HomaIrInterpretation;
} => {
  const { insulin, glucose, fasting = true } = opts;
  if (!fasting) {
    throw new Error('HOMA-IR is only valid for fasting insulin and glucose');
  }
  if (insulin <= 0) {
    throw new RangeError('Insulin must be a value greater than zero.');
  }
  if (glucose <= 0) {
    throw new RangeError('Glucose must be a value greater than zero.');
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

  return { value, interpretation };
};
