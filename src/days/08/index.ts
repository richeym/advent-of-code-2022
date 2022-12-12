export const parseInput = (input: string): number[][] =>
  input
    .trim()
    .split("\n")
    .map((line) => {
      return line.split("").map(Number);
    });

export const countVisibleTrees = (trees: number[][]): number => {
  let visible = 0;
  for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
      visible +=
        isVisibleFromLeft(trees, row, col) ||
        isVisibleFromRight(trees, row, col) ||
        isVisibleFromTop(trees, row, col) ||
        isVisibleFromBottom(trees, row, col)
          ? 1
          : 0;
    }
  }
  return visible;
};

export const getScenicScore = (
  trees: number[][],
  row: number,
  col: number
): number => {
  return (
    countVisibleTreesToLeft(trees, row, col) *
    countVisibleTreesToRight(trees, row, col) *
    countVisibleTreesToTop(trees, row, col) *
    countVisibleTreesToBottom(trees, row, col)
  );
};

// lots of refactoring could be done here as these methods
// all reuse the same formula for left / right / up / down

const countVisibleTreesToTop = (
  trees: number[][],
  row: number,
  col: number
): number => {
  const lineOfSight = trees
    .map((i) => i.slice(col, col + 1))
    .map((x) => x[0])
    .slice(0, row)
    .reverse();
  return getVisibleTreeCount(lineOfSight, trees[row][col]);
};

const countVisibleTreesToBottom = (
  trees: number[][],
  row: number,
  col: number
): number => {
  const lineOfSight = trees
    .map((i) => i.slice(col, col + 1))
    .map((x) => x[0])
    .slice(row + 1);
  return getVisibleTreeCount(lineOfSight, trees[row][col]);
};

const countVisibleTreesToLeft = (
  trees: number[][],
  row: number,
  col: number
): number => {
  const lineOfSight = trees[row].slice(0, col).reverse();
  return getVisibleTreeCount(lineOfSight, trees[row][col]);
};

const countVisibleTreesToRight = (
  trees: number[][],
  row: number,
  col: number
): number => {
  const lineOfSight = trees[row].slice(col + 1);
  return getVisibleTreeCount(lineOfSight, trees[row][col]);
};

const getVisibleTreeCount = (trees: number[], currentTreeHeight: number) => {
  let visible = 0;

  while (trees.length) {
    visible++;
    const value = trees.shift()!;
    if (value >= currentTreeHeight) break;
  }

  return visible;
};

const isVisibleFromLeft = (
  trees: number[][],
  row: number,
  col: number
): boolean => {
  return trees[row].slice(0, col).every((height) => height < trees[row][col]);
};

const isVisibleFromRight = (
  trees: number[][],
  row: number,
  col: number
): boolean => {
  return trees[row].slice(col + 1).every((height) => height < trees[row][col]);
};

const isVisibleFromTop = (
  trees: number[][],
  row: number,
  col: number
): boolean => {
  return trees
    .map((i) => i.slice(col, col + 1))
    .map((x) => x[0])
    .slice(0, row)
    .every((height) => height < trees[row][col]);
};

const isVisibleFromBottom = (
  trees: number[][],
  row: number,
  col: number
): boolean => {
  return trees
    .map((i) => i.slice(col, col + 1))
    .map((x) => x[0])
    .slice(row + 1)
    .every((height) => height < trees[row][col]);
};

export const getPart1Answer = (input: string): number => {
  return countVisibleTrees(parseInput(input));
};

export const getPart2Answer = (input: string): number => {
  const trees = parseInput(input);

  let bestScenicScore = 0;

  for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
      const scenicScore = getScenicScore(trees, row, col);
      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }

  return bestScenicScore;
};
