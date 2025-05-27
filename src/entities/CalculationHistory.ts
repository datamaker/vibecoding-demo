import { CalculationResult } from './CalculationResult';

/**
 * 계산 기록을 나타내는 인터페이스
 * 
 * 이 인터페이스는 계산 결과의 기록을 관리합니다.
 * Clean Architecture에서 엔티티 계층에 속하며, 비즈니스 로직의 핵심 규칙을 담당합니다.
 */
export interface CalculationHistory {
  /**
   * 계산 결과 항목들
   */
  items: CalculationResult[];
  
  /**
   * 계산 결과를 기록에 추가합니다.
   * @param item 추가할 계산 결과
   */
  add(item: CalculationResult): void;
  
  /**
   * 모든 계산 기록을 삭제합니다.
   */
  clear(): void;
  
  /**
   * 모든 계산 기록을 반환합니다.
   * 직접적인 수정을 방지하기 위해 복사본을 반환해야 합니다.
   * @returns 계산 결과 항목의 배열 복사본
   */
  getItems(): CalculationResult[];
}
