import * as path from "path";

import {
  executeCdCommand,
  FSEntry,
  getPart1Answer,
  getPart2Answer,
  parseTerminalCommand,
  storeFileSystemEntries,
  TerminalCommand,
} from ".";
import { readFileToString } from "../../util";

describe("Day 07", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  const terminalCommandTestData: (string | TerminalCommand)[][] = [
    ["cd", "$ cd /", { command: "cd", args: "/", outputs: [] }],
    [
      "ls",
      "$ ls\ndir a\n4848514 b.txt",
      { command: "ls", args: "", outputs: ["dir a", "4848514 b.txt"] },
    ],
  ];

  test.each(terminalCommandTestData)(
    "parses terminal command: %p",
    (_commandName, commandAndOutput, expectedTerminalCommand) => {
      const terminalCommand = parseTerminalCommand(commandAndOutput.toString());

      const expected = expectedTerminalCommand as TerminalCommand;
      expect(terminalCommand.command).toEqual(expected.command);
      expect(terminalCommand.args).toEqual(expected.args);
      expect(terminalCommand.outputs).toEqual(expected.outputs);
    }
  );

  it("stores filesystem entries", () => {
    const entries = ["dir a", "14848514 b.txt", "8504156 c.dat"];
    const workingDir = {
      name: "/",
      isDirectory: true,
      size: 0,
      children: [],
    };

    storeFileSystemEntries(workingDir, entries);

    expect(workingDir.children).toEqual([
      {
        name: "a",
        isDirectory: true,
        size: 0,
        children: [],
        parent: workingDir,
      },
      {
        name: "b.txt",
        isDirectory: false,
        size: 14848514,
        children: [],
        parent: workingDir,
      },
      {
        name: "c.dat",
        isDirectory: false,
        size: 8504156,
        children: [],
        parent: workingDir,
      },
    ]);
  });

  it("cd can change to root directory", () => {
    const workingDir: FSEntry = {
      name: "a",
      isDirectory: true,
      size: 0,
      children: [],
    };

    const rootDir: FSEntry = {
      name: "/",
      isDirectory: true,
      size: 0,
      children: [workingDir],
    };

    workingDir.parent = rootDir;

    const newWorkingDir = executeCdCommand(workingDir, "/");

    expect(newWorkingDir.name).toEqual(rootDir.name);
  });

  it("cd can go up a level", () => {
    const workingDir: FSEntry = {
      name: "workingDir",
      isDirectory: true,
      size: 0,
      children: [],
    };

    const subDir: FSEntry = {
      name: "expectedDir",
      isDirectory: true,
      size: 0,
      children: [workingDir],
    };
    workingDir.parent = subDir;

    const rootDir: FSEntry = {
      name: "/",
      isDirectory: true,
      size: 0,
      children: [subDir],
    };
    subDir.parent = rootDir;

    const newWorkingDir = executeCdCommand(workingDir, "..");

    expect(newWorkingDir.name).toEqual(subDir.name);
  });

  it("cd can go into a directory", () => {
    const subDir: FSEntry = {
      name: "expectedDir",
      isDirectory: true,
      size: 0,
      children: [],
    };

    const rootDir: FSEntry = {
      name: "/",
      isDirectory: true,
      size: 0,
      children: [subDir],
    };
    subDir.parent = rootDir;

    const newWorkingDir = executeCdCommand(rootDir, "expectedDir");

    expect(newWorkingDir.name).toEqual(subDir.name);
  });

  // it("creates filesystem from input", () => {
  //   const fileSystem = parseTerminalOutput(sampleInput);

  //   const expectedFileSystem: FSEntry = {
  //     name: "/",
  //     children: [
  //       {
  //         name: "a",
  //         children: [
  //           {
  //             name: "e",
  //             children: [{ name: "i" }],
  //           },
  //           { name: "f" },
  //           { name: "g" },
  //           { name: "h.lst" },
  //         ],
  //       },
  //       {
  //         name: "b.txt",
  //       },
  //       { name: "c.dat" },
  //       {
  //         name: "d",
  //         children: [
  //           { name: "j" },
  //           { name: "d.log" },
  //           { name: "d.ext" },
  //           { name: "k" },
  //         ],
  //       },
  //     ],
  //   };

  //   expect(fileSystem).toEqual(expectedFileSystem);
  // });

  it("solves part 1", () => {
    getPart1Answer(realInput);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
