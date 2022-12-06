export const parseInput = (
  input: string
): { stacks: string[][]; instructions: string[] } => {
  const inputs = input.trimEnd().split("\n\n");

  const stacks: string[][] = readStacks(inputs[0]);
  const instructions: string[] = readInstructions(inputs[1]);

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

const readInstructions = (input: string): string[] => {
  const moveRegex = new RegExp(/^move (\d+) from (\d+) to (\d+)$/);
  const instructions: string[] = [];

  for (let inputLine of input.split("\n")) {
    const match = moveRegex.exec(inputLine)!;
    const instruction = `${match[1]}-${match[2]}-${match[3]}`;
    instructions.push(instruction);
  }
  return instructions;
};

export const moveCrate = (
  stacks: string[][],
  instruction: string
): string[][] => {
  const [distance, from, to] = instruction.split("-").map(Number);

  try {
    for (let i = 0; i < distance; i++) {
      const crate = stacks[from - 1].pop()!;
      stacks[to - 1].push(crate);
    }

    return stacks;
  } catch (err) {
    throw Error(
      `${err}\n\n${distance} from ${from} to ${to}\nStack: ${stacks}`
    );
  }
};

export const getSuppliesForEachStack = (stacks: string[][]): string =>
  stacks.reduce((acc, curr) => {
    return (acc += curr[curr.length - 1]);
  }, "");

export const getPart1Answer = (input: string): string => {
  let { stacks, instructions } = parseInput(input);
  for (let instruction of instructions) {
    stacks = moveCrate(stacks, instruction);
  }

  return getSuppliesForEachStack(stacks);
};

export const getPart2Answer = (input: string): void => {
  return;
};
