export interface Instruction {
  amount: number;
  from: number;
  to: number;
}

export const parseInput = (
  input: string
): { stacks: string[][]; instructions: Instruction[] } => {
  const inputs = input.trimEnd().split("\n\n");

  const stacks: string[][] = readStacks(inputs[0]);
  const instructions: Instruction[] = readInstructions(inputs[1]);

  return { stacks, instructions };
};

const readStacks = (input: string): string[][] => {
  const stackInput = input.split("\n");
  stackInput.pop();

  const bottomRow = stackInput.length;

  const stacks: string[][] = [];

  for (let row = bottomRow; row--; row > 0) {
    for (
      let col = 1, stack = 0;
      col < stackInput[0].length;
      col += 4, stack++
    ) {
      const item = stackInput[row][col].trim();
      if (item !== "") {
        if (stacks[stack] === undefined) {
          stacks[stack] = [];
        }
        stacks[stack].push(item);
      }
    }
  }
  return stacks;
};

const readInstructions = (input: string): Instruction[] => {
  const moveRegex = new RegExp(/^move (\d+) from (\d+) to (\d+)$/);
  const instructions: Instruction[] = [];

  for (let inputLine of input.split("\n")) {
    const match = moveRegex.exec(inputLine)!;
    const instruction: Instruction = {
      amount: parseInt(match[1]),
      from: parseInt(match[2]),
      to: parseInt(match[3]),
    };

    instructions.push(instruction);
  }

  return instructions;
};

export const moveCrate = (
  stacks: string[][],
  instruction: Instruction
): void => {
  for (let i = 0; i < instruction.amount; i++) {
    const crate = stacks[instruction.from - 1].pop()!;
    stacks[instruction.to - 1].push(crate);
  }
};

export const moveCrate9001 = (
  stacks: string[][],
  instruction: Instruction
): void => {
  const crates = stacks[instruction.from - 1].slice(instruction.amount * -1);
  stacks[instruction.to - 1] = stacks[instruction.to - 1].concat(crates);
  stacks[instruction.from - 1] = stacks[instruction.from - 1].slice(
    0,
    instruction.amount * -1
  );
};

export const getSuppliesForEachStack = (stacks: string[][]): string =>
  stacks.reduce((acc, curr) => {
    return (acc += curr[curr.length - 1]);
  }, "");

export const getPart1Answer = (input: string): string => {
  let { stacks, instructions } = parseInput(input);
  for (let instruction of instructions) {
    moveCrate(stacks, instruction);
  }

  return getSuppliesForEachStack(stacks);
};

export const getPart2Answer = (input: string): string => {
  let { stacks, instructions } = parseInput(input);
  for (let instruction of instructions) {
    moveCrate9001(stacks, instruction);
  }

  return getSuppliesForEachStack(stacks);
};
