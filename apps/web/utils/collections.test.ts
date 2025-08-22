import { difference } from './collections';

describe('difference', () => {
  it('should return the difference between two connection objects', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 4, d: 5 };
    const result = difference(obj1, obj2);
    expect(result).toEqual({ b: 4, c: null, d: 5 });
  });

  it('should return an empty object if both are equal', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(difference(obj1, obj2)).toEqual({});
  });

  it('should handle empty objects', () => {
    expect(difference({}, {})).toEqual({});
    expect(difference({ a: 1 }, {})).toEqual({ a: null });
    expect(difference({}, { a: 2 })).toEqual({ a: 2 });
  });
});
