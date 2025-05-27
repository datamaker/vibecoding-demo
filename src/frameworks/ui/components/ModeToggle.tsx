import React from 'react';
import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';

/**
 * 계산기 모드 전환 컴포넌트
 * 
 * 이 컴포넌트는 일반 모드와 공학용 모드 간의 전환을 제공합니다.
 */
export const ModeToggle: React.FC = () => {
  const { colorMode } = useColorMode();
  const { state, toggleMode } = useCalculatorContext();
  const { isEngineeringMode } = state;

  return (
    <Flex justify="center" mb={4}>
      <Button
        onClick={toggleMode}
        colorScheme={isEngineeringMode ? 'purple' : 'blue'}
        variant="outline"
        size="md"
      >
        {isEngineeringMode ? '일반 모드로 전환' : '공학용 모드로 전환'}
      </Button>
    </Flex>
  );
};

export default ModeToggle;
