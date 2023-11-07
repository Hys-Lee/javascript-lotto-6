import { Random, Console } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

// 추후 리팩토링하기
const PAYMENTCOMMENT = '구입금액을 입력해 주세요.\n';
const WINNINGNUMBERSCOMMENT = '\n당첨 번호를 입력해 주세요.\n';
const BONUSNUMBERCOMMENT = '\n보너스 번호를 입력해 주세요.\n';

export default class Lottery {
  #payMoney;

  #winningNumberList;

  #bonusNumer;

  #lottoList;

  constructor() {
    this.#payMoney = 0;
    this.#winningNumberList = [];
    this.#bonusNumer = 0;
    this.#lottoList = [];
  }

  commomValidator(inputValue) {
    if (Number.isNaN(inputValue)) throw Error('숫자 형식이 아닙니다.');
    if (!Number.isInteger(inputValue)) throw Error('정수가 아닙니다.');
    if (inputValue <= 0) throw Error('앙의 정수가 아닙니다.');
  }

  async readPayMoney() {
    this.#payMoney = Number(await Console.readLineAsync(PAYMENTCOMMENT));

    // exception check
    this.commomValidator(this.#payMoney);

    if (this.#payMoney % 1000 !== 0) throw Error('1000원 단위가 아닙니다.');

    // make Lottos.
    this.pay();
  }

  async readWinningNumberList() {
    this.#winningNumberList = (
      await Console.readLineAsync(WINNINGNUMBERSCOMMENT)
    )
      .split(',')
      .map((element) => Number(element));

    // exception check
    if (this.#winningNumberList.length !== 6)
      throw Error('6개의 번호가 아니거나 ","로 구분하지 않았습니다');

    this.#winningNumberList.forEach((winningNumber) => {
      this.commomValidator(winningNumber);
      if (winningNumber < 1 || winningNumber > 45)
        throw Error('각 번호가 1~45 사이 자연수이지 않습니다.');
    });
  }

  async readBonusNumber() {
    this.#bonusNumer = Number(await Console.readLineAsync(BONUSNUMBERCOMMENT));
    this.commomValidator(this.#bonusNumer);
    if (this.#bonusNumer < 1 || this.#bonusNumer > 45)
      throw Error('각 번호가 1~45 사이 자연수이지 않습니다.');
  }

  pay() {
    // TODO
    const numberOfLotto = this.#payMoney / 1000;
    // 발행
    for (let i = 0; i < numberOfLotto; i += 1) {
      this.#lottoList.push(
        new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)),
      );
    }
    // 발행 출력
    Console.print(`\n${numberOfLotto}개를 구매했습니다.`);
    // 각각 정렬
    this.#lottoList.forEach((lotto) => lotto.sortNumbers());
    // 로또들 출력
    this.#lottoList.forEach((lotto) => lotto.printNumbers());
  }
}
