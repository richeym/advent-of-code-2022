export const parseInput = (input: string): string[] => {
  return input.trim().split("\n");
};

export const rearrange = (backpacks: string[]): string[][] => {
  const rearranged = backpacks.map((value: string) => {
    const middle = value.length / 2;
    return [value.slice(0, middle), value.slice(middle)];
  });

  return rearranged;
};

export const getItemInBothCompartments = (a: string, b: string): string => {
  for (let char of a.split("")) {
    if (b.indexOf(char) > -1) {
      return char;
    }
  }

  throw Error(`Item not in both compartments: ${a}, ${b}`);
};

export const getItemPriority = (item: string): number => {
  return item.toLowerCase() === item
    ? item.charCodeAt(0) - 96
    : item.charCodeAt(0) - 65 + 27;
};

export const sumPriorities = (priorities: number[]): number =>
  priorities.reduce((acc, current) => acc + current);

export const getPart1Answer = (input: string): number => {
  const parsedInput = parseInput(input);
  const rearranged = rearrange(parsedInput);
  const itemsInBothCompartments = rearranged.map((value) =>
    getItemInBothCompartments(value[0], value[1])
  );

  const priorities = itemsInBothCompartments.map((value) =>
    getItemPriority(value)
  );

  return sumPriorities(priorities);
};

export const getPart2Answer = (input: string): void => {
  return;
};
