import React from 'react';
import { Button, Grid, useColorMode, useBreakpointValue } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';

/**
 * 키패드 컴포넌트 인터페이스
 */
interface KeypadProps {
  onButtonClick: (value: string) => void;
}

/**
 * 계산기의 키패드 컴포넌트
 * 
 * 이 컴포넌트는 계산기의 키패드를 제공합니다.
 * 일반 모드와 공학용 모드에 따라 다른 키패드를 표시합니다.
 */
export const Keypad: React.FC<KeypadProps> = ({ onButtonClick }) => {
  const { colorMode } = useColorMode();
  const { state } = useCalculatorContext();
  const { isEngineeringMode } = state;
  
  // 반응형 디자인을 위한 브레이크포인트 값
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const buttonHeight = useBreakpointValue({ base: '2.5rem', md: '3rem', lg: '3.5rem' });
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const gap = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const borderRadius = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });

  // 기본 키패드 버튼 정의
  const basicButtons = [
    { value: 'C', variant: 'calculatorOperation', label: 'C' },
    { value: '(', variant: 'calculatorOperation', label: '(' },
    { value: ')', variant: 'calculatorOperation', label: ')' },
    { value: '/', variant: 'calculatorOperation', label: '÷' },
    { value: '7', variant: 'calculatorNumber', label: '7' },
    { value: '8', variant: 'calculatorNumber', label: '8' },
    { value: '9', variant: 'calculatorNumber', label: '9' },
    { value: '*', variant: 'calculatorOperation', label: '×' },
    { value: '4', variant: 'calculatorNumber', label: '4' },
    { value: '5', variant: 'calculatorNumber', label: '5' },
    { value: '6', variant: 'calculatorNumber', label: '6' },
    { value: '-', variant: 'calculatorOperation', label: '-' },
    { value: '1', variant: 'calculatorNumber', label: '1' },
    { value: '2', variant: 'calculatorNumber', label: '2' },
    { value: '3', variant: 'calculatorNumber', label: '3' },
    { value: '+', variant: 'calculatorOperation', label: '+' },
    { value: '0', variant: 'calculatorNumber', label: '0' },
    { value: '.', variant: 'calculatorNumber', label: '.' },
    { value: 'DEL', variant: 'calculatorOperation', label: '⌫' },
    { value: '=', variant: 'calculatorEqual', label: '=' },
  ];

  // 공학용 키패드 추가 버튼 정의
  const engineeringButtons = [
    { value: 'sin(', variant: 'calculatorFunction', label: 'sin' },
    { value: 'cos(', variant: 'calculatorFunction', label: 'cos' },
    { value: 'tan(', variant: 'calculatorFunction', label: 'tan' },
    { value: 'PI', variant: 'calculatorFunction', label: 'π' },
    { value: 'log(', variant: 'calculatorFunction', label: 'log' },
    { value: 'log10(', variant: 'calculatorFunction', label: 'log₁₀' },
    { value: 'sqrt(', variant: 'calculatorFunction', label: '√' },
    { value: 'e', variant: 'calculatorFunction', label: 'e' },
    { value: '^', variant: 'calculatorFunction', label: 'xⁿ' },
    { value: '%', variant: 'calculatorFunction', label: '%' },
    { value: '!', variant: 'calculatorFunction', label: 'x!' },
    { value: 'abs(', variant: 'calculatorFunction', label: '|x|' },
  ];

  return (
    <>
      {isEngineeringMode && (
        <Grid templateColumns="repeat(4, 1fr)" gap={gap} mb={4}>
          {engineeringButtons.map((button) => (
            <Button
              key={button.value}
              onClick={() => onButtonClick(button.value)}
              variant={button.variant as any}
              size={buttonSize}
              h={buttonHeight}
              fontSize={fontSize}
              borderRadius={borderRadius}
              _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 0.2s'
              }}
              _active={{
                transform: 'scale(0.95)',
                transition: 'transform 0.1s'
              }}
              transition="all 0.2s"
              boxShadow="md"
              bg={colorMode === 'dark' ? 
                `${button.variant === 'calculatorNumber' ? 'gray.600' : 
                  button.variant === 'calculatorOperation' ? 'teal.700' : 
                  button.variant === 'calculatorFunction' ? 'blue.700' : 
                  button.variant === 'calculatorEqual' ? 'red.700' : 'gray.600'}`
                : 
                `${button.variant === 'calculatorNumber' ? 'gray.100' : 
                  button.variant === 'calculatorOperation' ? 'teal.100' : 
                  button.variant === 'calculatorFunction' ? 'blue.100' : 
                  button.variant === 'calculatorEqual' ? 'red.100' : 'gray.100'}`
              }
            >
              {button.label}
            </Button>
          ))}
        </Grid>
      )}
      <Grid templateColumns="repeat(4, 1fr)" gap={gap}>
        {basicButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => onButtonClick(button.value)}
            variant={button.variant as any}
            size={buttonSize}
            h={buttonHeight}
            fontSize={fontSize}
            borderRadius={borderRadius}
            _hover={{
              transform: 'scale(1.05)',
              transition: 'transform 0.2s'
            }}
            _active={{
              transform: 'scale(0.95)',
              transition: 'transform 0.1s'
            }}
            transition="all 0.2s"
            boxShadow="md"
            bg={colorMode === 'dark' ? 
              `${button.variant === 'calculatorNumber' ? 'gray.600' : 
                button.variant === 'calculatorOperation' ? 'teal.700' : 
                button.variant === 'calculatorFunction' ? 'blue.700' : 
                button.variant === 'calculatorEqual' ? 'red.700' : 'gray.600'}`
              : 
              `${button.variant === 'calculatorNumber' ? 'gray.100' : 
                button.variant === 'calculatorOperation' ? 'teal.100' : 
                button.variant === 'calculatorFunction' ? 'blue.100' : 
                button.variant === 'calculatorEqual' ? 'red.100' : 'gray.100'}`
            }
          >
            {button.label}
          </Button>
        ))}
      </Grid>
    </>
  );
};

export default Keypad;
