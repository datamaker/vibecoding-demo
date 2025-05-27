import { Expression } from '@entities/Expression';
import * as mathjs from 'mathjs';

/**
 * Math.js 라이브러리를 사용하여 Expression 인터페이스를 구현한 어댑터 클래스
 * 
 * 이 클래스는 외부 라이브러리인 Math.js를 사용하여 수학 표현식을 계산합니다.
 * Clean Architecture에서 어댑터 계층에 속하며, 외부 라이브러리와의 인터페이스를 담당합니다.
 * SOLID 원칙 중 인터페이스 분리 원칙(ISP)과 의존성 역전 원칙(DIP)을 따릅니다.
 */
export class MathJsExpression implements Expression {
  /**
   * 생성자
   * @param value 수학 표현식 문자열
   */
  constructor(public value: string) {}

  /**
   * 표현식을 계산하여 숫자 결과를 반환합니다.
   * @returns 계산된 숫자 결과
   * @throws 유효하지 않은 표현식일 경우 에러 발생
   */
  evaluate(): number {
    try {
      return mathjs.evaluate(this.value);
    } catch (error) {
      throw new Error(`Failed to evaluate expression: ${this.value}. ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 표현식을 문자열로 변환합니다.
   * @returns 표현식의 문자열 표현
   */
  toString(): string {
    return this.value;
  }
}
