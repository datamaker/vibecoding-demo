import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 색상 모드 설정 (다크/라이트 모드)
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

// 계산기 테마 색상 및 스타일 정의
const theme = extendTheme({
  config,
  colors: {
    calculator: {
      display: {
        light: '#f0f0f0',
        dark: '#2d3748',
      },
      button: {
        number: {
          bg: {
            light: '#e2e8f0',
            dark: '#4a5568',
          },
          hover: {
            light: '#cbd5e0',
            dark: '#2d3748',
          },
        },
        operation: {
          bg: {
            light: '#e6fffa',
            dark: '#285e61',
          },
          hover: {
            light: '#b2f5ea',
            dark: '#234e52',
          },
        },
        function: {
          bg: {
            light: '#ebf4ff',
            dark: '#2c5282',
          },
          hover: {
            light: '#bee3f8',
            dark: '#2a4365',
          },
        },
        equal: {
          bg: {
            light: '#fed7d7',
            dark: '#822727',
          },
          hover: {
            light: '#feb2b2',
            dark: '#63171b',
          },
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: 'md',
      },
      variants: {
        calculatorNumber: props => ({
          bg: props.colorMode === 'dark' 
            ? 'calculator.button.number.bg.dark' 
            : 'calculator.button.number.bg.light',
          _hover: {
            bg: props.colorMode === 'dark' 
              ? 'calculator.button.number.hover.dark' 
              : 'calculator.button.number.hover.light',
          },
        }),
        calculatorOperation: props => ({
          bg: props.colorMode === 'dark' 
            ? 'calculator.button.operation.bg.dark' 
            : 'calculator.button.operation.bg.light',
          _hover: {
            bg: props.colorMode === 'dark' 
              ? 'calculator.button.operation.hover.dark' 
              : 'calculator.button.operation.hover.light',
          },
        }),
        calculatorFunction: props => ({
          bg: props.colorMode === 'dark' 
            ? 'calculator.button.function.bg.dark' 
            : 'calculator.button.function.bg.light',
          _hover: {
            bg: props.colorMode === 'dark' 
              ? 'calculator.button.function.hover.dark' 
              : 'calculator.button.function.hover.light',
          },
        }),
        calculatorEqual: props => ({
          bg: props.colorMode === 'dark' 
            ? 'calculator.button.equal.bg.dark' 
            : 'calculator.button.equal.bg.light',
          _hover: {
            bg: props.colorMode === 'dark' 
              ? 'calculator.button.equal.hover.dark' 
              : 'calculator.button.equal.hover.light',
          },
        }),
      },
    },
  },
});

export default theme;
