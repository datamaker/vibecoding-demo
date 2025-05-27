import { describe, it, expect } from 'vitest';
import { Expression } from '../Expression';

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

describe('Expression', () => {
  it('should create an expression with a value', () => {
    const expression = new TestExpression('2 + 3', 5);
    expect(expression.value).toBe('2 + 3');
  });

  it('should evaluate to a number', () => {
    const expression = new TestExpression('2 + 3', 5);
    expect(expression.evaluate()).toBe(5);
  });

  it('should convert to string representation', () => {
    const expression = new TestExpression('2 + 3', 5);
    expect(expression.toString()).toBe('2 + 3');
  });

  it('should handle complex expressions', () => {
    const expression = new TestExpression('(3 + 5) * 2 - 4 / 2', 14);
    expect(expression.evaluate()).toBe(14);
    expect(expression.toString()).toBe('(3 + 5) * 2 - 4 / 2');
  });
});
