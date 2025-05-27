import React from 'react';
import { CalculatorProvider } from '@frameworks/state/calculatorContext';
import Calculator from '@frameworks/ui/components/Calculator';

/**
 * 앱의 루트 컴포넌트
 * 
 * 이 컴포넌트는 계산기 앱의 진입점입니다.
 * 상태 관리 프로바이더를 설정하고 메인 계산기 컴포넌트를 렌더링합니다.
 */
function App() {
  return (
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  );
}

export default App;
