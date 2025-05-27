import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { CalculatorContext, CalculatorProvider, useCalculatorContext } from '../calculatorContext';
import { CalculationResult } from '@entities/CalculationResult';

// 테스트용 컴포넌트
const TestComponent = () => {
  const { state, setExpression, setResult, addToHistory, clearHistory, toggleMode, toggleTheme } = useCalculatorContext();

  return (
    <div>
      <div data-testid="expression">{state.expression}</div>
      <div data-testid="result">{state.result}</div>
      <div data-testid="history-length">{state.history.length}</div>
      <div data-testid="is-engineering-mode">{state.isEngineeringMode ? 'true' : 'false'}</div>
      <div data-testid="is-dark-mode">{state.isDarkMode ? 'true' : 'false'}</div>
      
      <button onClick={() => setExpression('2 + 3')}>Set Expression</button>
      <button onClick={() => setResult('5')}>Set Result</button>
      <button onClick={() => addToHistory({
        expression: '2 + 3',
        result: 5,
        timestamp: new Date()
      })}>Add To History</button>
      <button onClick={clearHistory}>Clear History</button>
      <button onClick={toggleMode}>Toggle Mode</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('CalculatorContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should provide initial state', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    expect(screen.getByTestId('expression').textContent).toBe('');
    expect(screen.getByTestId('result').textContent).toBe('0');
    expect(screen.getByTestId('history-length').textContent).toBe('0');
    expect(screen.getByTestId('is-engineering-mode').textContent).toBe('false');
    expect(screen.getByTestId('is-dark-mode').textContent).toBe('false');
  });

  it('should update expression', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    fireEvent.click(screen.getByText('Set Expression'));
    expect(screen.getByTestId('expression').textContent).toBe('2 + 3');
  });

  it('should update result', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    fireEvent.click(screen.getByText('Set Result'));
    expect(screen.getByTestId('result').textContent).toBe('5');
  });

  it('should add to history', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    fireEvent.click(screen.getByText('Add To History'));
    expect(screen.getByTestId('history-length').textContent).toBe('1');
  });

  it('should clear history', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    fireEvent.click(screen.getByText('Add To History'));
    expect(screen.getByTestId('history-length').textContent).toBe('1');

    fireEvent.click(screen.getByText('Clear History'));
    expect(screen.getByTestId('history-length').textContent).toBe('0');
  });

  it('should toggle mode', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    expect(screen.getByTestId('is-engineering-mode').textContent).toBe('false');
    fireEvent.click(screen.getByText('Toggle Mode'));
    expect(screen.getByTestId('is-engineering-mode').textContent).toBe('true');
    fireEvent.click(screen.getByText('Toggle Mode'));
    expect(screen.getByTestId('is-engineering-mode').textContent).toBe('false');
  });

  it('should toggle theme', () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>
    );

    expect(screen.getByTestId('is-dark-mode').textContent).toBe('false');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('is-dark-mode').textContent).toBe('true');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('is-dark-mode').textContent).toBe('false');
  });
});
