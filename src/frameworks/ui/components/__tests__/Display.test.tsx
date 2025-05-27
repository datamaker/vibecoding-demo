import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Display from '../Display';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { ChakraProvider } from '@chakra-ui/react';

// Mock useCalculatorContext
vi.mock('@frameworks/state/calculatorContext', async () => {
  const actual = await vi.importActual('@frameworks/state/calculatorContext');
  return {
    ...actual as any,
    useCalculatorContext: () => ({
      state: {
        expression: '2 + 3',
        result: '5',
        history: [],
        isEngineeringMode: false,
        isDarkMode: false,
      },
    }),
  };
});

// Mock useColorMode
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual as any,
    useColorMode: () => ({
      colorMode: 'light',
    }),
  };
});

describe('Display', () => {
  it('renders expression and result correctly', () => {
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Display />
        </CalculatorProvider>
      </ChakraProvider>
    );

    expect(screen.getByText('2 + 3')).toBeInTheDocument();
    expect(screen.getByTestId('calculator-result')).toHaveTextContent('5');
  });
});
