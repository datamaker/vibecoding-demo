import { describe, it, expect } from 'vitest';
import { CalculationHistory } from '../CalculationHistory';
import { CalculationResult } from '../CalculationResult';

// 테스트용 CalculationHistory 구현체
class TestCalculationHistory implements CalculationHistory {
  items: CalculationResult[] = [];

  add(item: CalculationResult): void {
    this.items.push(item);
  }

  clear(): void {
    this.items = [];
  }

  getItems(): CalculationResult[] {
    return [...this.items];
  }
}

describe('CalculationHistory', () => {
  it('should create an empty history', () => {
    const history = new TestCalculationHistory();
    expect(history.getItems()).toHaveLength(0);
  });

  it('should add items to history', () => {
    const history = new TestCalculationHistory();
    const result1: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };
    const result2: CalculationResult = {
      expression: '10 - 4',
      result: 6,
      timestamp: new Date()
    };

    history.add(result1);
    expect(history.getItems()).toHaveLength(1);
    expect(history.getItems()[0]).toBe(result1);

    history.add(result2);
    expect(history.getItems()).toHaveLength(2);
    expect(history.getItems()[1]).toBe(result2);
  });

  it('should clear history', () => {
    const history = new TestCalculationHistory();
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };

    history.add(result);
    expect(history.getItems()).toHaveLength(1);

    history.clear();
    expect(history.getItems()).toHaveLength(0);
  });

  it('should return a copy of items to prevent direct modification', () => {
    const history = new TestCalculationHistory();
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };

    history.add(result);
    const items = history.getItems();
    items.push({
      expression: '10 - 4',
      result: 6,
      timestamp: new Date()
    });

    // 원본 history의 items 길이는 여전히 1이어야 함
    expect(history.getItems()).toHaveLength(1);
  });
});
