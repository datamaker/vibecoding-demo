/**
 * 계산 결과를 나타내는 인터페이스
 * 
 * 이 인터페이스는 수학 표현식의 계산 결과를 표현합니다.
 * Clean Architecture에서 엔티티 계층에 속하며, 비즈니스 로직의 핵심 규칙을 담당합니다.
 */
export interface CalculationResult {
  /**
   * 계산된 표현식의 원본 문자열
   */
  expression: string;
  
  /**
   * 계산 결과 값
   */
  result: number;
  
  /**
   * 계산이 수행된 시간
   */
  timestamp: Date;
}
