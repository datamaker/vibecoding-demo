import React from 'react';
import { Box, Button, Flex, Heading, List, ListItem, Text, useColorMode, useBreakpointValue, Badge, Tooltip } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';
import { DeleteIcon, RepeatIcon, TimeIcon } from '@chakra-ui/icons';

/**
 * 계산 기록 컴포넌트 인터페이스
 */
interface HistoryProps {
  onHistoryItemClick: (expression: string) => void;
}

/**
 * 계산 기록 컴포넌트
 * 
 * 이 컴포넌트는 계산 기록을 표시하고 관리합니다.
 */
export const History: React.FC<HistoryProps> = ({ onHistoryItemClick }) => {
  const { colorMode } = useColorMode();
  const { state, clearHistory } = useCalculatorContext();
  const { history } = state;

  // 반응형 디자인을 위한 브레이크포인트 값
  const headingSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm', lg: 'md' });
  const padding = useBreakpointValue({ base: 2, md: 3, lg: 4 });
  const maxHeight = useBreakpointValue({ base: '150px', md: '200px', lg: '250px' });

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <Box
      w="100%"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
      p={padding}
      borderRadius="md"
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
        bgGradient="linear(to-r, teal.400, blue.500)"
      />
      
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size={headingSize}>
          <Flex alignItems="center">
            <TimeIcon mr={2} />
            계산 기록
            {history.length > 0 && (
              <Badge ml={2} colorScheme="teal" borderRadius="full" px={2}>
                {history.length}
              </Badge>
            )}
          </Flex>
        </Heading>
        <Tooltip label="모든 기록 삭제" placement="top">
          <Button
            size="sm"
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={clearHistory}
            variant="outline"
            _hover={{ bg: 'red.100', color: 'red.700' }}
          >
            기록 삭제
          </Button>
        </Tooltip>
      </Flex>

      {history.length === 0 ? (
        <Flex 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          p={4} 
          color="gray.500"
          height="100px"
        >
          <TimeIcon boxSize={6} mb={2} />
          <Text>기록이 없습니다.</Text>
        </Flex>
      ) : (
        <Box
          maxHeight={maxHeight}
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
              borderRadius: '2px',
            },
          }}
        >
          <List spacing={2}>
            {history.map((item, index) => (
              <ListItem
                key={index}
                p={padding}
                borderRadius="md"
                bg={colorMode === 'dark' ? 'gray.600' : 'white'}
                cursor="pointer"
                onClick={() => onHistoryItemClick(item.expression)}
                _hover={{ 
                  bg: colorMode === 'dark' ? 'gray.500' : 'gray.200',
                  transform: 'translateY(-2px)',
                  boxShadow: 'md'
                }}
                transition="all 0.2s"
                boxShadow="sm"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box flex="1">
                    <Text fontWeight="bold" fontSize={fontSize}>{item.expression} = {item.result}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatDate(item.timestamp)}
                    </Text>
                  </Box>
                  <Tooltip label="이 계산 다시 사용" placement="top">
                    <Box 
                      as="span" 
                      ml={2} 
                      color="blue.500"
                      _hover={{ color: 'blue.300' }}
                    >
                      <RepeatIcon />
                    </Box>
                  </Tooltip>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default History;
