export const getElfCalorieCounts = (input: string): number[] => {
  const parsedInput = input.split("\n\n");

  const calorieCounts = parsedInput.map((input) => {
    return input
      .split("\n")
      .map(Number)
      .reduce((acc, current) => acc + current);
  });

  return calorieCounts;
};

export const getElfCarryingMostCalories = (input: string): number => {
  const calorieCounts = getElfCalorieCounts(input);

  const max = Math.max(...calorieCounts);

  return calorieCounts.indexOf(max) + 1;
};

export const getPart1Answer = (input: string): number => {
  const calorieCounts = getElfCalorieCounts(input);
  return Math.max(...calorieCounts);
};

export const getPart2Answer = (input: string): number => {
  const calorieCounts = getElfCalorieCounts(input);
  return calorieCounts
    .sort((a, b) => (a > b ? -1 : 1))
    .slice(0, 3)
    .reduce((accumulator, current) => accumulator + current);
};
