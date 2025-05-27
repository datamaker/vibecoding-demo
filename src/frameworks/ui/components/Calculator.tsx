import React from 'react';
import { Box } from '@chakra-ui/react';
import Layout from './Layout';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';
import ModeToggle from './ModeToggle';
import { useCalculator } from '@frameworks/ui/hooks/useCalculator';

/**
 * 계산기 메인 컴포넌트
 * 
 * 이 컴포넌트는 계산기의 모든 UI 컴포넌트를 통합합니다.
 * Clean Architecture의 프레임워크 계층에 속하며, 사용자 인터페이스를 담당합니다.
 */
export const Calculator: React.FC = () => {
  const {
    handleButtonClick,
    handleHistoryItemClick
  } = useCalculator();

  return (
    <Layout>
      <Box 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="xl"
        p={4}
      >
        <ModeToggle />
        <Display />
        <Keypad onButtonClick={handleButtonClick} />
        <History onHistoryItemClick={handleHistoryItemClick} />
      </Box>
    </Layout>
  );
};

export default Calculator;
