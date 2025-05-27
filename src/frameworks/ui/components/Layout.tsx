import React from 'react';
import { Box, Container, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

/**
 * 계산기 앱의 기본 레이아웃 컴포넌트
 * 
 * 이 컴포넌트는 계산기 앱의 기본 레이아웃을 제공합니다.
 * 다크/라이트 모드 전환 버튼을 포함합니다.
 */
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { state, toggleTheme } = useCalculatorContext();

  // 테마 전환 핸들러
  const handleThemeToggle = () => {
    toggleTheme();
    toggleColorMode();
  };

  return (
    <Box 
      minH="100vh" 
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      color={colorMode === 'dark' ? 'white' : 'gray.800'}
      transition="all 0.2s"
    >
      <Container maxW="container.sm" py={4}>
        <Flex justify="flex-end" mb={4}>
          <IconButton
            aria-label={colorMode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={handleThemeToggle}
            variant="ghost"
            size="md"
          />
        </Flex>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
