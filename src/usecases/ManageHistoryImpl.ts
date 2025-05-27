import { CalculationResult } from '@entities/CalculationResult';
import { CalculationHistory } from '@entities/CalculationHistory';
import { ManageHistoryUseCase } from './ManageHistory';

/**
 * ManageHistoryUseCase 인터페이스의 구현체
 * 
 * 이 클래스는 계산 결과의 기록을 관리하는 기능을 구현합니다.
 * SOLID 원칙 중 단일 책임 원칙(SRP)을 따라 기록 관리 기능만 담당합니다.
 * 의존성 역전 원칙(DIP)에 따라 구체적인 구현체가 아닌 추상화된 인터페이스에 의존합니다.
 */
export class ManageHistoryImpl implements ManageHistoryUseCase {
  /**
   * 생성자
   * @param history 계산 기록 저장소
   */
  constructor(private history: CalculationHistory) {}

  /**
   * 계산 결과를 기록에 추가합니다.
   * @param result 추가할 계산 결과
   */
  addToHistory(result: CalculationResult): void {
    this.history.add(result);
  }

  /**
   * 모든 계산 기록을 삭제합니다.
   */
  clearHistory(): void {
    this.history.clear();
  }

  /**
   * 현재 계산 기록을 반환합니다.
   * @returns 계산 기록
   */
  getHistory(): CalculationHistory {
    return this.history;
  }
}
