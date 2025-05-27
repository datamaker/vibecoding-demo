import React from 'react';
import { Button, Flex, useColorMode, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';

/**
 * 계산기 모드 전환 컴포넌트
 * 
 * 이 컴포넌트는 일반 모드와 공학용 모드 간의 전환을 제공합니다.
 */
export const ModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { state, toggleMode } = useCalculatorContext();
  const { isEngineeringMode } = state;
  
  // 반응형 디자인을 위한 브레이크포인트 값
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const iconSize = useBreakpointValue({ base: 4, md: 5, lg: 6 });

  return (
    <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
      <Tooltip label={isEngineeringMode ? '일반 모드로 전환' : '공학용 모드로 전환'} placement="top">
        <Button
          onClick={toggleMode}
          colorScheme={isEngineeringMode ? 'purple' : 'blue'}
          variant="outline"
          size={buttonSize}
          transition="all 0.3s"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'md'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'sm'
          }}
        >
          {isEngineeringMode ? '일반 모드' : '공학용 모드'}
        </Button>
      </Tooltip>
      
      <Tooltip label={colorMode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'} placement="top">
        <Button
          onClick={toggleColorMode}
          colorScheme={colorMode === 'dark' ? 'yellow' : 'gray'}
          variant="outline"
          size={buttonSize}
          leftIcon={colorMode === 'dark' ? <SunIcon boxSize={iconSize} /> : <MoonIcon boxSize={iconSize} />}
          transition="all 0.3s"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'md'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'sm'
          }}
        >
          {colorMode === 'dark' ? '라이트 모드' : '다크 모드'}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ModeToggle;
