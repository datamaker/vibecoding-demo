import React from 'react';
import { Button, Grid, useColorMode } from '@chakra-ui/react';
import { useCalculatorContext } from '@frameworks/state/calculatorContext';

/**
 * 계산기의 키패드 컴포넌트
 * 
 * 이 컴포넌트는 계산기의 키패드를 제공합니다.
 * 일반 모드와 공학용 모드에 따라 다른 키패드를 표시합니다.
 */
export const Keypad: React.FC<{
  onButtonClick: (value: string) => void;
}> = ({ onButtonClick }) => {
  const { colorMode } = useColorMode();
  const { state } = useCalculatorContext();
  const { isEngineeringMode } = state;

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
        <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
          {engineeringButtons.map((button) => (
            <Button
              key={button.value}
              onClick={() => onButtonClick(button.value)}
              variant={button.variant as any}
              size="md"
              h="3rem"
              fontSize="lg"
            >
              {button.label}
            </Button>
          ))}
        </Grid>
      )}
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {basicButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => onButtonClick(button.value)}
            variant={button.variant as any}
            size="md"
            h="3rem"
            fontSize="lg"
          >
            {button.label}
          </Button>
        ))}
      </Grid>
    </>
  );
};

export default Keypad;
