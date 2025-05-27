import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../Layout';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { ChakraProvider } from '@chakra-ui/react';

// Mock useColorMode
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual as any,
    useColorMode: () => ({
      colorMode: 'light',
      toggleColorMode: vi.fn(),
    }),
  };
});

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Layout>
            <div data-testid="test-child">Test Child</div>
          </Layout>
        </CalculatorProvider>
      </ChakraProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child').textContent).toBe('Test Child');
  });

  it('renders theme toggle button', () => {
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </CalculatorProvider>
      </ChakraProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
