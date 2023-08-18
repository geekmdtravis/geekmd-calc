import { homaIR } from './homaIR';

const variance = 0.1;

describe('homaIR', () => {
  it('throws an error if fasting is false', () => {
    expect(() =>
      homaIR({ glucose: 12.3, insulin: 104, fasting: false })
    ).toThrowError();
  });
  it('throws an error if insulin is less than or equal to zero', () => {
    expect(() =>
      homaIR({ glucose: 12.3, insulin: 0, fasting: true })
    ).toThrowError();
  });
  it('throws an error if glucose is less than or equal to zero', () => {
    expect(() =>
      homaIR({ glucose: 0, insulin: 104, fasting: true })
    ).toThrowError();
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
});
