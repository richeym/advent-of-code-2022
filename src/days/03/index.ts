export const parseInput = (input: string): string[] => {
  return input.trim().split("\n");
};

export const compartmentalise = (rucksacks: string[]): string[][] => {
  const rearranged = rucksacks.map((value: string) => {
    const middle = value.length / 2;
    return [value.slice(0, middle), value.slice(middle)];
  });

  return rearranged;
};

export const getDuplicateItem = (containers: string[]): string => {
  for (let char of containers[0].split("")) {
    if (containers.every((container) => container.includes(char))) {
      return char;
    }
  }

  throw Error("Duplicate item found");
};

export const getItemPriority = (item: string): number => {
  const letter = item.charCodeAt(0);

  return item.toLowerCase() === item ? letter - 96 : letter - 65 + 27;
};

export const sumPriorities = (priorities: number[]): number =>
  priorities.reduce((acc, current) => acc + current);

export const groupRucksacks = (rucksacks: string[]): string[][] => {
  const groupSize = 3;
  let groupedRucksacks: string[][] = [];

  for (let i = 0; i < rucksacks.length; i += groupSize) {
    groupedRucksacks.push(rucksacks.slice(i, i + groupSize));
  }

  return groupedRucksacks;
};

export const getPart1Answer = (input: string): number => {
  const rucksacks = parseInput(input);
  const sorted = compartmentalise(rucksacks);
  const itemsInBothCompartments = sorted.map((value) =>
    getDuplicateItem(value)
  );

  const priorities = itemsInBothCompartments.map((value) =>
    getItemPriority(value)
  );

  return sumPriorities(priorities);
};

export const getPart2Answer = (input: string): number => {
  const rucksacks = parseInput(input);
  const grouped = groupRucksacks(rucksacks);
  const duplicateItems = grouped.map((rucksack) => getDuplicateItem(rucksack));
  const priorities = duplicateItems.map((item) => getItemPriority(item));

  return sumPriorities(priorities);
};
