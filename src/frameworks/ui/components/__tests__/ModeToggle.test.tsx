import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModeToggle from '../ModeToggle';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { ChakraProvider } from '@chakra-ui/react';

// Mock useCalculatorContext
vi.mock('@frameworks/state/calculatorContext', async () => {
  const actual = await vi.importActual('@frameworks/state/calculatorContext');
  return {
    ...actual as any,
    useCalculatorContext: () => ({
      state: {
        isEngineeringMode: false,
      },
      toggleMode: vi.fn(),
    }),
  };
});

describe('ModeToggle', () => {
  it('renders toggle button with correct text when in normal mode', () => {
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <ModeToggle />
        </CalculatorProvider>
      </ChakraProvider>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('공학용 모드로 전환');
  });

  it('renders toggle button with correct text when in engineering mode', () => {
    // Override isEngineeringMode to be true
    vi.mocked(require('@frameworks/state/calculatorContext').useCalculatorContext).mockReturnValue({
      state: {
        isEngineeringMode: true,
      },
      toggleMode: vi.fn(),
    });
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <ModeToggle />
        </CalculatorProvider>
      </ChakraProvider>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('일반 모드로 전환');
  });

  it('calls toggleMode when button is clicked', () => {
    const toggleModeMock = vi.fn();
    
    // Override toggleMode mock
    vi.mocked(require('@frameworks/state/calculatorContext').useCalculatorContext).mockReturnValue({
      state: {
        isEngineeringMode: false,
      },
      toggleMode: toggleModeMock,
    });
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <ModeToggle />
        </CalculatorProvider>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(toggleModeMock).toHaveBeenCalled();
  });
});
