import React from 'react';
import { Box, Flex, useBreakpointValue, useColorMode, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, Heading, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
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
 * 반응형 디자인을 적용하여 다양한 화면 크기에 대응합니다.
 */
export const Calculator: React.FC = () => {
  const {
    handleButtonClick,
    handleHistoryItemClick
  } = useCalculator();
  
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // 반응형 디자인을 위한 브레이크포인트 값
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const calculatorWidth = useBreakpointValue({ 
    base: '100%', 
    sm: '450px', 
    md: '500px', 
    lg: '900px' 
  });
  const padding = useBreakpointValue({ base: 3, md: 4, lg: 5 });
  const drawerSize = useBreakpointValue({ base: 'full', md: 'md' });

  return (
    <Layout>
      {isLargeScreen ? (
        // 데스크톱 레이아웃 - 계산기와 기록을 나란히 배치
        <Flex 
          width={calculatorWidth} 
          gap={4} 
          direction="row" 
          justify="center"
        >
          <Box 
            flex="3"
            borderRadius="lg" 
            overflow="hidden" 
            boxShadow="xl"
            p={padding}
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
            transition="all 0.3s ease"
            _hover={{ boxShadow: '2xl' }}
          >
            <ModeToggle />
            <Display />
            <Keypad onButtonClick={handleButtonClick} />
          </Box>
          <Box 
            flex="2"
            borderRadius="lg" 
            overflow="hidden" 
            boxShadow="xl"
            p={padding}
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
            maxHeight="80vh"
            overflowY="auto"
            transition="all 0.3s ease"
            _hover={{ boxShadow: '2xl' }}
          >
            <History onHistoryItemClick={handleHistoryItemClick} />
          </Box>
        </Flex>
      ) : (
        // 모바일 레이아웃 - 계산기와 Drawer를 사용한 기록 표시
        <Box position="relative">
          <Box 
            width={calculatorWidth} 
            borderRadius="lg" 
            overflow="hidden" 
            boxShadow="xl"
            p={padding}
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
            transition="all 0.3s ease"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <ModeToggle />
              <IconButton
                aria-label="계산 기록 보기"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="outline"
                colorScheme="teal"
                size="md"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md'
                }}
              />
            </Flex>
            <Display />
            <Keypad onButtonClick={handleButtonClick} />
          </Box>
          
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={drawerSize}
          >
            <DrawerOverlay />
            <DrawerContent
              bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            >
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <Heading size="md">계산 기록</Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  이전 계산 결과를 클릭하면 다시 사용할 수 있습니다.
                </Text>
              </DrawerHeader>
              <DrawerBody>
                <History onHistoryItemClick={(expression) => {
                  handleHistoryItemClick(expression);
                  onClose();
                }} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      )}
    </Layout>
  );
};

export default Calculator;
