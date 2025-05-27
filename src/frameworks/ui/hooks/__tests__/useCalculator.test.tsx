import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../useCalculator';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { MathJsExpression } from '@adapters/MathJsAdapter';
import { CalculateExpressionImpl } from '@usecases/CalculateExpressionImpl';

// Mock dependencies
vi.mock('@adapters/MathJsAdapter', () => ({
  MathJsExpression: vi.fn(),
}));

vi.mock('@usecases/CalculateExpressionImpl', () => ({
  CalculateExpressionImpl: vi.fn(),
}));

vi.mock('@frameworks/state/calculatorContext', async () => {
  const actual = await vi.importActual('@frameworks/state/calculatorContext');
  return {
    ...actual as any,
    useCalculatorContext: vi.fn(),
  };
});

describe('useCalculator', () => {
  const mockState = {
    expression: '',
    result: '0',
    history: [],
    isEngineeringMode: false,
    isDarkMode: false,
  };

  const mockSetExpression = vi.fn();
  const mockSetResult = vi.fn();
  const mockAddToHistory = vi.fn();
  const mockClearHistory = vi.fn();
  const mockToggleMode = vi.fn();
  const mockToggleTheme = vi.fn();

  const mockCalculationResult = {
    expression: '2 + 3',
    result: 5,
    timestamp: new Date(),
  };

  const mockEvaluate = vi.fn().mockReturnValue(5);
  const mockToString = vi.fn().mockReturnValue('2 + 3');

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useCalculatorContext
    require('@frameworks/state/calculatorContext').useCalculatorContext.mockReturnValue({
      state: mockState,
      setExpression: mockSetExpression,
      setResult: mockSetResult,
      addToHistory: mockAddToHistory,
      clearHistory: mockClearHistory,
      toggleMode: mockToggleMode,
      toggleTheme: mockToggleTheme,
    });

    // Mock MathJsExpression
    MathJsExpression.mockImplementation(() => ({
      evaluate: mockEvaluate,
      toString: mockToString,
    }));

    // Mock CalculateExpressionImpl
    CalculateExpressionImpl.mockImplementation(() => ({
      execute: vi.fn().mockReturnValue(mockCalculationResult),
    }));
  });

  it('returns state and functions from context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    expect(result.current.expression).toBe(mockState.expression);
    expect(result.current.result).toBe(mockState.result);
    expect(result.current.history).toBe(mockState.history);
    expect(result.current.isEngineeringMode).toBe(mockState.isEngineeringMode);
    expect(result.current.isDarkMode).toBe(mockState.isDarkMode);
    expect(typeof result.current.handleButtonClick).toBe('function');
    expect(typeof result.current.handleHistoryItemClick).toBe('function');
    expect(result.current.clearHistory).toBe(mockClearHistory);
    expect(result.current.toggleMode).toBe(mockToggleMode);
    expect(result.current.toggleTheme).toBe(mockToggleTheme);
  });

  it('handles button click for C to clear expression and result', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleButtonClick('C');
    });

    expect(mockSetExpression).toHaveBeenCalledWith('');
    expect(mockSetResult).toHaveBeenCalledWith('0');
  });

  it('handles button click for = to calculate expression', () => {
    // Override state to have an expression
    require('@frameworks/state/calculatorContext').useCalculatorContext.mockReturnValue({
      state: { ...mockState, expression: '2 + 3' },
      setExpression: mockSetExpression,
      setResult: mockSetResult,
      addToHistory: mockAddToHistory,
      clearHistory: mockClearHistory,
      toggleMode: mockToggleMode,
      toggleTheme: mockToggleTheme,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleButtonClick('=');
    });

    expect(MathJsExpression).toHaveBeenCalledWith('2 + 3');
    expect(mockSetResult).toHaveBeenCalledWith('5');
    expect(mockAddToHistory).toHaveBeenCalled();
  });

  it('handles button click for DEL to delete last character', () => {
    // Override state to have an expression
    require('@frameworks/state/calculatorContext').useCalculatorContext.mockReturnValue({
      state: { ...mockState, expression: '2 + 3' },
      setExpression: mockSetExpression,
      setResult: mockSetResult,
      addToHistory: mockAddToHistory,
      clearHistory: mockClearHistory,
      toggleMode: mockToggleMode,
      toggleTheme: mockToggleTheme,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleButtonClick('DEL');
    });

    expect(mockSetExpression).toHaveBeenCalledWith('2 + ');
  });

  it('handles button click for other values to append to expression', () => {
    // Override state to have an expression
    require('@frameworks/state/calculatorContext').useCalculatorContext.mockReturnValue({
      state: { ...mockState, expression: '2 + ' },
      setExpression: mockSetExpression,
      setResult: mockSetResult,
      addToHistory: mockAddToHistory,
      clearHistory: mockClearHistory,
      toggleMode: mockToggleMode,
      toggleTheme: mockToggleTheme,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleButtonClick('3');
    });

    expect(mockSetExpression).toHaveBeenCalledWith('2 + 3');
  });

  it('handles history item click to set expression', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleHistoryItemClick('2 + 3');
    });

    expect(mockSetExpression).toHaveBeenCalledWith('2 + 3');
  });
});
