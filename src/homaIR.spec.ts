import { homaIR } from './homaIR';

const variance = 0.1;

describe('homaIR', () => {
  it('throws an Error if fasting is false', () => {
    expect(() =>
      homaIR({ glucose: 100, insulin: 10, fasting: false })
    ).toThrowError();
  });
  it('has the appropriate Error message when fasting is false', () => {
    try {
      homaIR({ glucose: 100, insulin: 10, fasting: false });
    } catch (e) {
      expect((e as Error).message).toBe(
        'HOMA-IR is only valid for fasting insulin and glucose'
      );
    }
  });
  it('throws a RangeError if insulin is less than or equal to zero', () => {
    try {
      homaIR({ glucose: 100, insulin: 0, fasting: true });
    } catch (e) {
      expect(e).toBeInstanceOf(RangeError);
    }
  });
  it('has the appropriate RangeError message when insulin is less than or equal to zero', () => {
    try {
      homaIR({ glucose: 100, insulin: 0, fasting: true });
    } catch (e) {
      expect((e as RangeError).message).toBe(
        'Insulin must be a value greater than zero.'
      );
    }
  });
  it('throws a RangeError if glucose is less than or equal to zero', () => {
    try {
      homaIR({ glucose: 0, insulin: 10, fasting: true });
    } catch (e) {
      expect(e).toBeInstanceOf(RangeError);
    }
  });
  it('has the appropriate RangeError message when glucose is less than or equal to zero', () => {
    try {
      homaIR({ glucose: 0, insulin: 10, fasting: true });
    } catch (e) {
      expect((e as RangeError).message).toBe(
        'Glucose must be a value greater than zero.'
      );
    }
  });
  it('throws a RangeError if decimal places are provided and less than zero', () => {
    try {
      homaIR({ glucose: 100, insulin: 10, fasting: true, decimalPlaces: -1 });
    } catch (e) {
      expect(e).toBeInstanceOf(RangeError);
    }
  });
  it('has the appropriate RangeError message when decimal places are provided and less than zero', () => {
    try {
      homaIR({ glucose: 100, insulin: 10, fasting: true, decimalPlaces: -1 });
    } catch (e) {
      expect((e as RangeError).message).toBe(
        'decimalPlaces must be a positive integer.'
      );
    }
  });
  it('reports insulin sensitivity when the score is less than 1', () => {
    const { value, interpretation } = homaIR({
      glucose: 85,
      insulin: 3,
      fasting: true,
    });
    const expected = 0.6;

    expect(value).toBeLessThan(expected + variance);
    expect(value).toBeGreaterThan(expected - variance);
    expect(interpretation).toBe('insulin sensitive');
  });
  it('reports insulin resistance when the score is between 1 and 2', () => {
    const { value, interpretation } = homaIR({
      glucose: 85,
      insulin: 8,
      fasting: true,
    });
    const expected = 1.7;
    expect(value).toBeLessThan(expected + variance);
    expect(value).toBeGreaterThan(expected - variance);
    expect(interpretation).toBe('insulin resistance');
  });
  it('reports significant insulin resistance when the score is greater than 2', () => {
    const { value, interpretation } = homaIR({
      glucose: 85,
      insulin: 15,
      fasting: true,
    });
    const expected = 3.1;
    expect(value).toBeLessThan(expected + variance);
    expect(value).toBeGreaterThan(expected - variance);
    expect(interpretation).toBe('significant insulin resistance');
  });
  it('rounds the result to the specified number of decimal places', () => {
    const { value } = homaIR({
      glucose: 85,
      insulin: 15,
      fasting: true,
      decimalPlaces: 2,
    });
    const expected = 3.15;
    expect(value).toBe(expected);
  });
  it('generates a warning if insulin is greater than 25 uIU/mL', () => {
    const { warnings } = homaIR({
      glucose: 85,
      insulin: 30,
      fasting: true,
    });
    expect(warnings).toContain(
      'Insulin levels above 25 uIU/mL are outside of the normal range.'
    );
  });
  it('generates a warning if glucose is greater than 125 mg/dL', () => {
    const { warnings } = homaIR({
      glucose: 130,
      insulin: 10,
      fasting: true,
    });
    expect(warnings).toContain(
      'Glucose levels above 125 mg/dL are strong indicators of insulin resistance.'
    );
  });
  it('generates a warning if glucose is between 100 and 125 mg/dL', () => {
    const { warnings } = homaIR({
      glucose: 110,
      insulin: 10,
      fasting: true,
    });
    expect(warnings).toContain(
      'Glucose levels between 100 and 125 mg/dL suggest possible insulin resistance.'
    );
  });
  it('generates a warning if glucose is between 54 and 70 mg/dL', () => {
    const { warnings } = homaIR({
      glucose: 60,
      insulin: 10,
      fasting: true,
    });
    expect(warnings).toContain(
      'Glucose levels below 70 mg/dL are hypoglycemic and require urgent attention.'
    );
  });
  it('generates a warning if glucose is less than 54 mg/dL', () => {
    const { warnings } = homaIR({
      glucose: 50,
      insulin: 10,
      fasting: true,
    });
    expect(warnings).toContain(
      'Glucose levels below 54 mg/dL are severely hypoglycemic and require immediate attention.'
    );
  });
});
