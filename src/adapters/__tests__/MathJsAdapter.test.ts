import { describe, it, expect } from 'vitest';
import { MathJsExpression } from '../MathJsAdapter';

describe('MathJsExpression', () => {
  it('should evaluate simple expression correctly', () => {
    const expression = new MathJsExpression('2 + 3');
    expect(expression.evaluate()).toBe(5);
    expect(expression.toString()).toBe('2 + 3');
  });

  it('should evaluate complex expression correctly', () => {
    const expression = new MathJsExpression('(3 + 5) * 2 - 4 / 2');
    expect(expression.evaluate()).toBe(14);
    expect(expression.toString()).toBe('(3 + 5) * 2 - 4 / 2');
  });

  it('should handle decimal results', () => {
    const expression = new MathJsExpression('10 / 3');
    expect(expression.evaluate()).toBeCloseTo(3.333333, 5);
    expect(expression.toString()).toBe('10 / 3');
  });

  it('should handle trigonometric functions', () => {
    const expression = new MathJsExpression('sin(PI/2)');
    expect(expression.evaluate()).toBeCloseTo(1, 10);
    expect(expression.toString()).toBe('sin(PI/2)');
  });

  it('should handle logarithmic functions', () => {
    const expression = new MathJsExpression('log10(100)');
    expect(expression.evaluate()).toBe(2);
    expect(expression.toString()).toBe('log10(100)');
  });

  it('should handle exponential functions', () => {
    const expression = new MathJsExpression('2^3');
    expect(expression.evaluate()).toBe(8);
    expect(expression.toString()).toBe('2^3');
  });

  it('should throw error for invalid expressions', () => {
    const expression = new MathJsExpression('2 +');
    expect(() => expression.evaluate()).toThrow();
  });
});
