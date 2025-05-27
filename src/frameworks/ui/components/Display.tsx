import React from 'react';
import { Box, Text, useColorMode, useBreakpointValue } from '@chakra-ui/react';
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
  
  // 반응형 디자인을 위한 브레이크포인트 값
  const expressionFontSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const resultFontSize = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });
  const padding = useBreakpointValue({ base: 3, md: 4, lg: 5 });

  return (
    <Box
      w="100%"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
      p={padding}
      borderRadius="md"
      mb={4}
      boxShadow="lg"
      transition="all 0.2s"
      _hover={{ boxShadow: 'xl' }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="4px"
        bgGradient="linear(to-r, blue.400, purple.500)"
      />
      <Text
        fontSize={expressionFontSize}
        color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
        textAlign="right"
        mb={2}
        minH="1.5rem"
        fontFamily="monospace"
        overflowX="auto"
        whiteSpace="nowrap"
        css={{
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
            borderRadius: '2px',
          },
        }}
      >
        {expression}
      </Text>
      <Text
        fontSize={resultFontSize}
        fontWeight="bold"
        textAlign="right"
        fontFamily="monospace"
        data-testid="calculator-result"
        overflowX="auto"
        whiteSpace="nowrap"
        transition="all 0.3s"
        css={{
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
            borderRadius: '2px',
          },
        }}
      >
        {result}
      </Text>
    </Box>
  );
};

export default Display;
