import { describe, it, expect, beforeEach } from 'vitest';
import { ManageHistoryUseCase } from '../ManageHistory';
import { CalculationResult } from '@entities/CalculationResult';
import { CalculationHistory } from '@entities/CalculationHistory';

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

// 테스트용 ManageHistoryUseCase 구현체
class TestManageHistoryUseCase implements ManageHistoryUseCase {
  constructor(private history: CalculationHistory) {}

  addToHistory(result: CalculationResult): void {
    this.history.add(result);
  }

  clearHistory(): void {
    this.history.clear();
  }

  getHistory(): CalculationHistory {
    return this.history;
  }
}

describe('ManageHistoryUseCase', () => {
  let history: CalculationHistory;
  let manageHistory: ManageHistoryUseCase;

  beforeEach(() => {
    history = new TestCalculationHistory();
    manageHistory = new TestManageHistoryUseCase(history);
  });

  it('should add calculation result to history', () => {
    // Given
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };

    // When
    manageHistory.addToHistory(result);

    // Then
    const historyItems = manageHistory.getHistory().getItems();
    expect(historyItems).toHaveLength(1);
    expect(historyItems[0]).toBe(result);
  });

  it('should clear history', () => {
    // Given
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };
    manageHistory.addToHistory(result);

    // When
    manageHistory.clearHistory();

    // Then
    const historyItems = manageHistory.getHistory().getItems();
    expect(historyItems).toHaveLength(0);
  });

  it('should get history', () => {
    // Given
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

    // When
    manageHistory.addToHistory(result1);
    manageHistory.addToHistory(result2);

    // Then
    const historyItems = manageHistory.getHistory().getItems();
    expect(historyItems).toHaveLength(2);
    expect(historyItems[0]).toBe(result1);
    expect(historyItems[1]).toBe(result2);
  });

  it('should return a copy of history to prevent direct modification', () => {
    // Given
    const result: CalculationResult = {
      expression: '2 + 3',
      result: 5,
      timestamp: new Date()
    };
    manageHistory.addToHistory(result);

    // When
    const historyItems = manageHistory.getHistory().getItems();
    historyItems.push({
      expression: '10 - 4',
      result: 6,
      timestamp: new Date()
    });

    // Then
    // 원본 history의 items 길이는 여전히 1이어야 함
    const originalHistoryItems = manageHistory.getHistory().getItems();
    expect(originalHistoryItems).toHaveLength(1);
  });
});
