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
  it('calculates the score appropriately within a reasonable variance', () => {
    const { value, interpretation } = homaIR({
      glucose: 12.3,
      insulin: 104,
      fasting: true,
    });
    const expected = 3.2;

    expect(value).toBeLessThan(expected + variance);
    expect(value).toBeGreaterThan(expected - variance);
    expect(interpretation).toBe('significant insulin resistance');
  });
});
