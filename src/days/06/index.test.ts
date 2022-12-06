import * as path from "path";

import { findStartOfPacketMarker, getPart1Answer, getPart2Answer } from ".";
import { readFileToString } from "../../util";

describe("Day 06", () => {
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  const testCases = [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 4, 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 4, 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 4, 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4, 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4, 11],
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14, 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 14, 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 14, 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14, 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14, 26],
  ];

  test.each(testCases)(
    "finds start-of-packet marker: %p",
    (input, packetSize, expectedOutput) => {
      const output = findStartOfPacketMarker(
        input.toString(),
        Number(packetSize)
      );
      expect(output).toEqual(expectedOutput);
    }
  );

  it("solves part 1", () => {
    const output = getPart1Answer(realInput);
    expect(output).toEqual(1100);
  });

  it("solves part 2", () => {
    const output = getPart2Answer(realInput);
    expect(output).toEqual(2421);
  });
});
