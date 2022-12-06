export const readAssignments = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .map((value) => value.split(","));

export const countContainedAssignments = (assignments: string[][]): number => {
  const count = assignments.reduce((counter, assignment) => {
    return (counter += isAssignmentContained(assignment[0], assignment[1])
      ? 1
      : 0);
  }, 0);

  return count;
};

export const isAssignmentContained = (a: string, b: string): boolean => {
  const [lowerA, upperA] = a.split("-").map(Number);
  const [lowerB, upperB] = b.split("-").map(Number);

  return (
    (lowerA <= lowerB && upperA >= upperB) ||
    (lowerB <= lowerA && upperB >= upperA)
  );
};

export const countOverlappingAssignments = (
  assignments: string[][]
): number => {
  const count = assignments.reduce((counter, assignment) => {
    return (counter += isAssignmentOverlapping(assignment[0], assignment[1])
      ? 1
      : 0);
  }, 0);

  return count;
};
export const isAssignmentOverlapping = (a: string, b: string): boolean => {
  const [lowerA, upperA] = a.split("-").map(Number);
  const [lowerB, upperB] = b.split("-").map(Number);

  return lowerA <= upperB && upperA >= lowerB;
};

export const getPart1Answer = (input: string): number => {
  const assignments = readAssignments(input);
  return countContainedAssignments(assignments);
};

export const getPart2Answer = (input: string): number => {
  const assignments = readAssignments(input);
  return countOverlappingAssignments(assignments);
};
