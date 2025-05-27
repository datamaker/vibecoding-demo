import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';

/**
 * 계산기의 디스플레이 컴포넌트
 * 
 * 이 컴포넌트는 현재 표현식과 계산 결과를 표시합니다.
 */
export const Display: React.FC = () => {
  const { colorMode } = useColorMode();
  const { state } = useCalculatorContext();
  const { expression, result } = state;

  return (
    <Box
      w="100%"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
      p={4}
      borderRadius="md"
      mb={4}
      boxShadow="md"
    >
      <Text
        fontSize="md"
        color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
        textAlign="right"
        mb={2}
        minH="1.5rem"
        fontFamily="monospace"
      >
        {expression}
      </Text>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textAlign="right"
        fontFamily="monospace"
        data-testid="calculator-result"
      >
        {result}
      </Text>
    </Box>
  );
};

export default Display;
