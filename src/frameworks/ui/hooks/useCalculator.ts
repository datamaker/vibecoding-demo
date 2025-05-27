import { useState, useCallback } from 'react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';
import { MathJsExpression } from '@adapters/MathJsAdapter';
import { CalculateExpressionImpl } from '@usecases/CalculateExpressionImpl';
import { CalculationResult } from '@entities/CalculationResult';

/**
 * 계산기 로직을 처리하는 커스텀 훅
 * 
 * 이 훅은 계산기의 핵심 기능을 담당하며, 엔티티, 유스케이스, 어댑터를 연결합니다.
 * Clean Architecture의 원칙에 따라 UI 계층과 비즈니스 로직을 분리합니다.
 */
export const useCalculator = () => {
  const {
    state,
    setExpression,
    setResult,
    addToHistory,
    clearHistory,
    toggleMode,
    toggleTheme
  } = useCalculatorContext();

  // 계산 유스케이스 인스턴스 생성
  const calculateExpression = new CalculateExpressionImpl();

  // 버튼 클릭 처리
  const handleButtonClick = useCallback((value: string) => {
    switch (value) {
      case 'C':
        // 모든 입력 초기화
        setExpression('');
        setResult('0');
        break;
      case '=':
        // 표현식 계산
        try {
          if (state.expression) {
            const mathExpression = new MathJsExpression(state.expression);
            const calculationResult = calculateExpression.execute(mathExpression);
            
            setResult(calculationResult.result.toString());
            addToHistory(calculationResult);
          }
        } catch (error) {
          setResult('Error');
        }
        break;
      case 'DEL':
        // 마지막 문자 삭제
        setExpression(state.expression.slice(0, -1));
        break;
      default:
        // 표현식에 문자 추가
        setExpression(state.expression + value);
        break;
    }
  }, [state.expression, setExpression, setResult, addToHistory, calculateExpression]);

  // 기록에서 표현식 선택 처리
  const handleHistoryItemClick = useCallback((expression: string) => {
    setExpression(expression);
  }, [setExpression]);

  return {
    expression: state.expression,
    result: state.result,
    history: state.history,
    isEngineeringMode: state.isEngineeringMode,
    isDarkMode: state.isDarkMode,
    handleButtonClick,
    handleHistoryItemClick,
    clearHistory,
    toggleMode,
    toggleTheme
  };
};

export default useCalculator;
