import { describe, it, expect, vi } from 'vitest';
import { CalculateExpressionUseCase } from '../CalculateExpression';
import { Expression } from '@entities/Expression';
import { CalculationResult } from '@entities/CalculationResult';

// 테스트용 Expression 구현체
class TestExpression implements Expression {
  constructor(public value: string, private evaluatedValue: number) {}

  evaluate(): number {
    return this.evaluatedValue;
  }

  toString(): string {
    return this.value;
  }
}

// 테스트용 CalculateExpressionUseCase 구현체
class TestCalculateExpressionUseCase implements CalculateExpressionUseCase {
  execute(expression: Expression): CalculationResult {
    const result = expression.evaluate();
    return {
      expression: expression.toString(),
      result,
      timestamp: new Date()
    };
  }
}

describe('CalculateExpressionUseCase', () => {
  it('should calculate expression and return result', () => {
    // Given
    const calculateExpression = new TestCalculateExpressionUseCase();
    const expression = new TestExpression('2 + 3', 5);
    
    // Mock Date.now to return a fixed timestamp
    const fixedDate = new Date('2025-05-27T08:00:00.000Z');
    vi.spyOn(global, 'Date').mockImplementation(() => fixedDate as unknown as string);
    
    // When
    const result = calculateExpression.execute(expression);
    
    // Then
    expect(result.expression).toBe('2 + 3');
    expect(result.result).toBe(5);
    expect(result.timestamp).toEqual(fixedDate);
    
    // Restore Date
    vi.restoreAllMocks();
  });

  it('should handle complex expressions', () => {
    // Given
    const calculateExpression = new TestCalculateExpressionUseCase();
    const expression = new TestExpression('(3 + 5) * 2 - 4 / 2', 14);
    
    // When
    const result = calculateExpression.execute(expression);
    
    // Then
    expect(result.expression).toBe('(3 + 5) * 2 - 4 / 2');
    expect(result.result).toBe(14);
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle decimal results', () => {
    // Given
    const calculateExpression = new TestCalculateExpressionUseCase();
    const expression = new TestExpression('10 / 3', 3.3333333333333335);
    
    // When
    const result = calculateExpression.execute(expression);
    
    // Then
    expect(result.expression).toBe('10 / 3');
    expect(result.result).toBeCloseTo(3.333333, 5);
    expect(result.timestamp).toBeInstanceOf(Date);
  });
});
