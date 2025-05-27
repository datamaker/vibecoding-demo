import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import History from '../History';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import { ChakraProvider } from '@chakra-ui/react';

// Mock Date for consistent testing
const mockDate = new Date('2025-05-27T08:00:00.000Z');
vi.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as string);

// Mock useCalculatorContext
vi.mock('@frameworks/state/calculatorContext', async () => {
  const actual = await vi.importActual('@frameworks/state/calculatorContext');
  return {
    ...actual as any,
    useCalculatorContext: () => ({
      state: {
        history: [
          { expression: '2 + 3', result: 5, timestamp: mockDate },
          { expression: '10 - 4', result: 6, timestamp: mockDate },
        ],
      },
      clearHistory: vi.fn(),
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

describe('History', () => {
  it('renders history items correctly', () => {
    const onHistoryItemClick = vi.fn();
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <History onHistoryItemClick={onHistoryItemClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 기록 항목들이 렌더링되는지 확인
    expect(screen.getByText('2 + 3 = 5')).toBeInTheDocument();
    expect(screen.getByText('10 - 4 = 6')).toBeInTheDocument();
  });

  it('calls onHistoryItemClick when history item is clicked', () => {
    const onHistoryItemClick = vi.fn();
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <History onHistoryItemClick={onHistoryItemClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 기록 항목 클릭 시 onHistoryItemClick이 호출되는지 확인
    fireEvent.click(screen.getByText('2 + 3 = 5'));
    expect(onHistoryItemClick).toHaveBeenCalledWith('2 + 3');
  });

  it('calls clearHistory when clear button is clicked', () => {
    const onHistoryItemClick = vi.fn();
    const clearHistoryMock = vi.fn();
    
    // Override clearHistory mock
    vi.mocked(require('@frameworks/state/calculatorContext').useCalculatorContext).mockReturnValue({
      state: {
        history: [
          { expression: '2 + 3', result: 5, timestamp: mockDate },
          { expression: '10 - 4', result: 6, timestamp: mockDate },
        ],
      },
      clearHistory: clearHistoryMock,
    });
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <History onHistoryItemClick={onHistoryItemClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 기록 삭제 버튼 클릭 시 clearHistory가 호출되는지 확인
    fireEvent.click(screen.getByText('기록 삭제'));
    expect(clearHistoryMock).toHaveBeenCalled();
  });

  it('renders empty state message when history is empty', () => {
    const onHistoryItemClick = vi.fn();
    
    // Override history to be empty
    vi.mocked(require('@frameworks/state/calculatorContext').useCalculatorContext).mockReturnValue({
      state: {
        history: [],
      },
      clearHistory: vi.fn(),
    });
    
    render(
      <ChakraProvider>
        <CalculatorProvider>
          <History onHistoryItemClick={onHistoryItemClick} />
        </CalculatorProvider>
      </ChakraProvider>
    );

    // 빈 상태 메시지가 렌더링되는지 확인
    expect(screen.getByText('아직 계산 기록이 없습니다.')).toBeInTheDocument();
    // 기록 삭제 버튼이 렌더링되지 않는지 확인
    expect(screen.queryByText('기록 삭제')).not.toBeInTheDocument();
  });
});
