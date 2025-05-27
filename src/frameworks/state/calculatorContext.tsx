import React, { createContext, useContext, useReducer } from 'react';
import { CalculationResult } from '@entities/CalculationResult';

// 상태 타입 정의
interface CalculatorState {
  expression: string;
  result: string;
  history: CalculationResult[];
  isEngineeringMode: boolean;
  isDarkMode: boolean;
}

// 액션 타입 정의
type CalculatorAction =
  | { type: 'SET_EXPRESSION'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: CalculationResult }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'TOGGLE_MODE' }
  | { type: 'TOGGLE_THEME' };

// 초기 상태
const initialState: CalculatorState = {
  expression: '',
  result: '0',
  history: [],
  isEngineeringMode: false,
  isDarkMode: false,
};

// 리듀서 함수
const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'SET_EXPRESSION':
      return {
        ...state,
        expression: action.payload,
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload,
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      };
    case 'TOGGLE_MODE':
      return {
        ...state,
        isEngineeringMode: !state.isEngineeringMode,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

// 컨텍스트 타입 정의
interface CalculatorContextType {
  state: CalculatorState;
  setExpression: (expression: string) => void;
  setResult: (result: string) => void;
  addToHistory: (result: CalculationResult) => void;
  clearHistory: () => void;
  toggleMode: () => void;
  toggleTheme: () => void;
}

// 컨텍스트 생성
export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// 컨텍스트 프로바이더
export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const setExpression = (expression: string) => {
    dispatch({ type: 'SET_EXPRESSION', payload: expression });
  };

  const setResult = (result: string) => {
    dispatch({ type: 'SET_RESULT', payload: result });
  };

  const addToHistory = (result: CalculationResult) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: result });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_MODE' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const value = {
    state,
    setExpression,
    setResult,
    addToHistory,
    clearHistory,
    toggleMode,
    toggleTheme,
  };

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
};

// 커스텀 훅
export const useCalculatorContext = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculatorContext must be used within a CalculatorProvider');
  }
  return context;
};
