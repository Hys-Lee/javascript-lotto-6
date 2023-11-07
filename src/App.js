/**
 * 추후, 맨 처음 docs 커밋 바꾸기 -> 동사로 시작하게.
 */
import { Console } from '@woowacourse/mission-utils';
import Lottery from './Lottery.js';

class App {
  #ERRORPREFIX = '[ERROR]';

  #game = new Lottery();

  async play() {
    const isInputStepEnd = {
      payMoney: false,
      winningNumberList: false,
      bonusNumber: false,
    };
    do {
      console.log(Object.entries(isInputStepEnd));
      try {
        // TODO
        if (!isInputStepEnd.payMoney) {
          await this.#game.readPayMoney();
          isInputStepEnd.payMoney = true;
        }

        if (!isInputStepEnd.winningNumberList) {
          await this.#game.readWinningNumberList();
          isInputStepEnd.winningNumberList = true;
        }

        if (!isInputStepEnd.bonusNumber) {
          await this.#game.readBonusNumber();
          isInputStepEnd.bonusNumber = true;
        }
      } catch (e) {
        Console.print(`${this.#ERRORPREFIX} ${e.message}`);

        Object.keys(isInputStepEnd).forEach((curStep) => {
          if (e.message.includes(curStep)) isInputStepEnd[curStep] = false;
        });
      }
    } while (Object.values(isInputStepEnd).includes(false));
    this.#game.matchNumbers();
    this.#game.printWinnigCount();
  }
}

export default App;
