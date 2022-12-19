import { MonkeyTestExpression } from "../types";

export const getMonkeyToThrowTo = (
  itemWorryLevel: number,
  expression: MonkeyTestExpression
): number =>
  itemWorryLevel % expression.divisor
    ? expression.monkeyIfFalse
    : expression.monkeyIfTrue;
