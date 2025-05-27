import { Expression } from '@entities/Expression';
import { CalculationResult } from '@entities/CalculationResult';
import { CalculateExpressionUseCase } from './CalculateExpression';

/**
 * CalculateExpressionUseCase 인터페이스의 구현체
 * 
 * 이 클래스는 수학 표현식을 계산하고 결과를 반환하는 기능을 구현합니다.
 * SOLID 원칙 중 단일 책임 원칙(SRP)을 따라 계산 기능만 담당합니다.
 */
export class CalculateExpressionImpl implements CalculateExpressionUseCase {
  /**
   * 주어진 표현식을 계산하고 결과를 반환합니다.
   * @param expression 계산할 표현식
   * @returns 계산 결과
   */
  execute(expression: Expression): CalculationResult {
    const result = expression.evaluate();
    
    return {
      expression: expression.toString(),
      result,
      timestamp: new Date()
    };
  }
}
