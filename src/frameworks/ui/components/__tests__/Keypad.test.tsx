import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Keypad from '../Keypad';
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

describe('Keypad', () => {
  it('renders basic keypad buttons', () => {
    const onButtonClick = vi.fn();
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Keypad onButtonClick={onButtonClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 기본 키패드 버튼들이 렌더링되는지 확인
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
    
    // 숫자 버튼들이 렌더링되는지 확인
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls onButtonClick with correct value when button is clicked', () => {
    const onButtonClick = vi.fn();
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Keypad onButtonClick={onButtonClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 버튼 클릭 시 onButtonClick이 호출되는지 확인
    fireEvent.click(screen.getByText('5'));
    expect(onButtonClick).toHaveBeenCalledWith('5');
    
    fireEvent.click(screen.getByText('+'));
    expect(onButtonClick).toHaveBeenCalledWith('+');
  });

  it('renders engineering buttons when in engineering mode', () => {
    // Mock useCalculatorContext with engineering mode enabled
    vi.mocked(require('@frameworks/state/calculatorContext').useCalculatorContext).mockReturnValue({
      state: {
        isEngineeringMode: true,
      },
    });
    
    const onButtonClick = vi.fn();
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <Keypad onButtonClick={onButtonClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 공학용 키패드 버튼들이 렌더링되는지 확인
    expect(screen.getByText('sin')).toBeInTheDocument();
    expect(screen.getByText('cos')).toBeInTheDocument();
    expect(screen.getByText('log')).toBeInTheDocument();
    expect(screen.getByText('π')).toBeInTheDocument();
  });
});
