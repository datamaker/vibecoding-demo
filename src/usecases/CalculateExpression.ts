import { Expression } from '@entities/Expression';
import { CalculationResult } from '@entities/CalculationResult';

/**
 * 수학 표현식을 계산하는 유스케이스 인터페이스
 * 
 * 이 인터페이스는 수학 표현식을 계산하고 결과를 반환하는 기능을 정의합니다.
 * Clean Architecture에서 유스케이스 계층에 속하며, 애플리케이션 특화 비즈니스 규칙을 담당합니다.
 */
export interface CalculateExpressionUseCase {
  /**
   * 주어진 표현식을 계산하고 결과를 반환합니다.
   * @param expression 계산할 표현식
   * @returns 계산 결과
   */
  execute(expression: Expression): CalculationResult;
}
