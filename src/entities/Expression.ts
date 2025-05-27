/**
 * 수학 표현식을 나타내는 인터페이스
 * 
 * 이 인터페이스는 수학 표현식을 표현하고 계산하는 기능을 정의합니다.
 * Clean Architecture에서 엔티티 계층에 속하며, 비즈니스 로직의 핵심 규칙을 담당합니다.
 */
export interface Expression {
  /**
   * 표현식의 원본 문자열 값
   */
  value: string;
  
  /**
   * 표현식을 계산하여 숫자 결과를 반환합니다.
   * @returns 계산된 숫자 결과
   */
  evaluate(): number;
  
  /**
   * 표현식을 문자열로 변환합니다.
   * @returns 표현식의 문자열 표현
   */
  toString(): string;
}
