import { Box, Center, Heading, VStack } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh" p={4}>
      <Center>
        <VStack spacing={8}>
          <Heading as="h1" size="xl">공학용 계산기</Heading>
          <Box>
            {/* 계산기 컴포넌트가 여기에 추가될 예정입니다 */}
            <Heading as="h2" size="md">구현 중...</Heading>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
}

export default App;
