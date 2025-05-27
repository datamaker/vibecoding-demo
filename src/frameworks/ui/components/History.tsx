import React from 'react';
import { Box, Button, Flex, Heading, List, ListItem, Text, useColorMode } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';
import { DeleteIcon } from '@chakra-ui/icons';

/**
 * 계산 기록 컴포넌트
 * 
 * 이 컴포넌트는 계산 기록을 표시하고 관리합니다.
 */
export const History: React.FC<{
  onHistoryItemClick: (expression: string) => void;
}> = ({ onHistoryItemClick }) => {
  const { colorMode } = useColorMode();
  const { state, clearHistory } = useCalculatorContext();
  const { history } = state;

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <Box mt={6}>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="md">계산 기록</Heading>
        {history.length > 0 && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={clearHistory}
          >
            기록 삭제
          </Button>
        )}
      </Flex>
      {history.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          아직 계산 기록이 없습니다.
        </Text>
      ) : (
        <List spacing={2}>
          {[...history].reverse().map((item, index) => (
            <ListItem
              key={index}
              p={2}
              borderRadius="md"
              bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
              _hover={{
                bg: colorMode === 'dark' ? 'gray.600' : 'gray.200',
                cursor: 'pointer',
              }}
              onClick={() => onHistoryItemClick(item.expression)}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="sm" fontFamily="monospace">
                    {item.expression} = {item.result}
                  </Text>
                </Box>
                <Text fontSize="xs" color="gray.500">
                  {formatDate(item.timestamp)}
                </Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default History;
