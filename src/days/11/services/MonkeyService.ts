import { Monkey } from "../types";
import { getMonkeyToThrowTo } from "./ItemThrowCalculator";
import { calculateNewWorryLevel } from "./WorryLevelCalculator";

export interface MonkeyServiceResult {
  partOne: number;
}

export class MonkeyService {
  constructor(public monkeys: Monkey[]) {}

  execute = (rounds: number): MonkeyServiceResult => {
    const inspections: number[] = [];
    this.monkeys.forEach((_) => {
      inspections.push(0);
    });

    for (let i = 0; i < rounds; i++) {
      for (let m = 0; m < this.monkeys.length; m++) {
        const monkey = this.monkeys[m];

        while (monkey.items.length > 0) {
          const item = monkey.items.shift()!;

          inspections[m]++;

          const newItem = calculateNewWorryLevel(item, monkey.operation);
          const newMonkey = getMonkeyToThrowTo(newItem, monkey.testExpression);

          this.monkeys[newMonkey].items.push(newItem);
        }
      }
    }

    inspections.sort((a, b) => b - a);

    return {
      partOne: inspections.slice(0, 2).reduce((acc, curr) => {
        return acc * curr;
      }, 1),
    };
  };
}
