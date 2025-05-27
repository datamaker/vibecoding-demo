import { CalculationResult } from '@entities/CalculationResult';
import { CalculationHistory } from '@entities/CalculationHistory';

/**
 * 계산 기록을 관리하는 유스케이스 인터페이스
 * 
 * 이 인터페이스는 계산 결과의 기록을 관리하는 기능을 정의합니다.
 * Clean Architecture에서 유스케이스 계층에 속하며, 애플리케이션 특화 비즈니스 규칙을 담당합니다.
 */
export interface ManageHistoryUseCase {
  /**
   * 계산 결과를 기록에 추가합니다.
   * @param result 추가할 계산 결과
   */
  addToHistory(result: CalculationResult): void;
  
  /**
   * 모든 계산 기록을 삭제합니다.
   */
  clearHistory(): void;
  
  /**
   * 현재 계산 기록을 반환합니다.
   * @returns 계산 기록
   */
  getHistory(): CalculationHistory;
}
