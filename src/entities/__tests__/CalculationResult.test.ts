import { describe, it, expect } from 'vitest';
import { CalculationResult } from '../CalculationResult';

describe('CalculationResult', () => {
  it('should create a calculation result with expression, result and timestamp', () => {
    const timestamp = new Date();
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp
    };

    expect(result.expression).toBe('2 + 3');
    expect(result.result).toBe(5);
    expect(result.timestamp).toBe(timestamp);
  });

  it('should handle complex expressions', () => {
    const timestamp = new Date();
    const result: CalculationResult = {
      expression: '(3 + 5) * 2 - 4 / 2',
      result: 14,
      timestamp
    };

    expect(result.expression).toBe('(3 + 5) * 2 - 4 / 2');
    expect(result.result).toBe(14);
    expect(result.timestamp).toBe(timestamp);
  });

  it('should handle decimal results', () => {
    const timestamp = new Date();
    const result: CalculationResult = {
      expression: '10 / 3',
      result: 3.3333333333333335,
      timestamp
    };

    expect(result.expression).toBe('10 / 3');
    expect(result.result).toBeCloseTo(3.333333, 5);
    expect(result.timestamp).toBe(timestamp);
  });
});
