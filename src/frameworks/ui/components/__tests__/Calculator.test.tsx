import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Calculator from '../Calculator';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { ChakraProvider } from '@chakra-ui/react';

// Mock dependencies
vi.mock('../Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-layout">{children}</div>,
}));

vi.mock('../Display', () => ({
  default: () => <div data-testid="mock-display">Display Component</div>,
}));

vi.mock('../Keypad', () => ({
  default: ({ onButtonClick }: { onButtonClick: (value: string) => void }) => (
    <div data-testid="mock-keypad">
      Keypad Component
      <button onClick={() => onButtonClick('5')}>5</button>
    </div>
  ),
}));

vi.mock('../History', () => ({
  default: ({ onHistoryItemClick }: { onHistoryItemClick: (expression: string) => void }) => (
    <div data-testid="mock-history">
      History Component
      <button onClick={() => onHistoryItemClick('2 + 3')}>History Item</button>
    </div>
  ),
}));

vi.mock('../ModeToggle', () => ({
  default: () => <div data-testid="mock-mode-toggle">Mode Toggle Component</div>,
}));

vi.mock('@frameworks/ui/hooks/useCalculator', () => ({
  useCalculator: () => ({
    handleButtonClick: vi.fn(),
    handleHistoryItemClick: vi.fn(),
  }),
}));

describe('Calculator', () => {
  it('renders all calculator components', () => {
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </ChakraProvider>
    );

    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
    expect(screen.getByTestId('mock-display')).toBeInTheDocument();
    expect(screen.getByTestId('mock-keypad')).toBeInTheDocument();
    expect(screen.getByTestId('mock-history')).toBeInTheDocument();
    expect(screen.getByTestId('mock-mode-toggle')).toBeInTheDocument();
  });
});
