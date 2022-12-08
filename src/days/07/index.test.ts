import path from "path";

import {
  DirectoryMatch,
  executeCdCommand,
  Directory,
  getDirectorySize,
  getPart1Answer,
  getPart2Answer,
  parseTerminalCommand,
  parseTerminalOutputToFileSystem,
  storeFileSystemEntries,
  TerminalCommand,
  File,
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
    const cwd: Directory = {
      name: "/",
      files: [],
      subDirectories: [],
    };

    storeFileSystemEntries(cwd, entries);

    expect(cwd.subDirectories).toEqual([
      {
        name: "a",
        subDirectories: [],
        files: [],
        parent: cwd,
      },
    ]);

    expect(cwd.files).toEqual([
      {
        name: "b.txt",
        size: 14848514,
      },
      {
        name: "c.dat",
        size: 8504156,
      },
    ]);
  });

  it("cd can change to root directory", () => {
    const cwd: Directory = {
      name: "a",
      subDirectories: [],
      files: [],
    };

    const rootDir: Directory = {
      name: "/",
      subDirectories: [cwd],
      files: [],
    };

    cwd.parent = rootDir;

    const newCwd = executeCdCommand(cwd, "/");

    expect(newCwd.name).toEqual(rootDir.name);
  });

  it("cd can go up a level", () => {
    const cwd: Directory = {
      name: "cwd",
      subDirectories: [],
      files: [],
    };

    const subDir: Directory = {
      name: "expectedCwd",
      subDirectories: [cwd],
      files: [],
    };
    cwd.parent = subDir;

    const rootDir: Directory = {
      name: "/",
      subDirectories: [subDir],
      files: [],
    };
    subDir.parent = rootDir;

    const newCwd = executeCdCommand(cwd, "..");

    expect(newCwd.name).toEqual(subDir.name);
  });

  it("cd can go into a directory", () => {
    const subDir: Directory = {
      name: "expectedCwd",
      subDirectories: [],
      files: [],
    };

    const rootDir: Directory = {
      name: "/",
      subDirectories: [subDir],
      files: [],
    };
    subDir.parent = rootDir;

    const cwd = executeCdCommand(rootDir, "expectedCwd");

    expect(cwd.name).toEqual(subDir.name);
  });

  it("cd creates directory if it doesn't exist", () => {
    const rootDir: Directory = {
      name: "/",
      subDirectories: [],
      files: [],
    };

    const cwd = executeCdCommand(rootDir, "expectedDir");

    expect(cwd).toEqual({
      name: "expectedDir",
      subDirectories: [],
      files: [],
      parent: rootDir,
    });
  });

  it("creates filesystem from input", () => {
    const fileSystem = parseTerminalOutputToFileSystem(sampleInput);

    expect(fileSystem.name).toEqual("/");
    expect(fileSystem.files[0].name).toEqual("b.txt");
    expect(fileSystem.files[1].name).toEqual("c.dat");
    expect(fileSystem.subDirectories[0].name).toEqual("a");
    expect(fileSystem.subDirectories[0].files[0].name).toEqual("f");
    expect(fileSystem.subDirectories[0].files[1].name).toEqual("g");
    expect(fileSystem.subDirectories[0].files[2].name).toEqual("h.lst");
    expect(fileSystem.subDirectories[0].subDirectories[0].name).toEqual("e");
    expect(fileSystem.subDirectories[1].name).toEqual("d");
    expect(fileSystem.subDirectories[1].files[0].name).toEqual("j");
    expect(fileSystem.subDirectories[1].files[1].name).toEqual("d.log");
    expect(fileSystem.subDirectories[1].files[2].name).toEqual("d.ext");
    expect(fileSystem.subDirectories[1].files[3].name).toEqual("k");
  });

  it("calculates size of files in folder", () => {
    const fileAtRootA: File = {
      name: "a.txt",
      size: 50,
    };

    const fileAtRootB: File = {
      name: "b.txt",
      size: 150,
    };

    const fileAtLevel1: File = {
      name: "c.txt",
      size: 250,
    };

    const fileAtlevel2: File = {
      name: "c.txt",
      size: 50,
    };

    const level2Directory: Directory = {
      name: "level2Dir",
      subDirectories: [],
      files: [fileAtlevel2],
    };

    const level1Directory: Directory = {
      name: "level1Dir",
      subDirectories: [level2Directory],
      files: [fileAtLevel1],
    };
    level2Directory.parent = level1Directory;

    const rootDir: Directory = {
      name: "/",
      subDirectories: [level1Directory],
      files: [fileAtRootA, fileAtRootB],
    };
    level1Directory.parent = rootDir;

    const matches: DirectoryMatch[] = [];
    const size = getDirectorySize(rootDir, matches);

    expect(size).toEqual(500);

    expect(matches.find((x) => x.directory.name === "/")!.size).toBe(500);
    expect(matches.find((x) => x.directory.name === "level1Dir")!.size).toBe(
      300
    );
    expect(matches.find((x) => x.directory.name === "level2Dir")!.size).toBe(
      50
    );
  });

  it("solves part 1", () => {
    const size = getPart1Answer(realInput);
    expect(size).toEqual(1583951);
  });

  it("solves part 2", () => {
    const size = getPart2Answer(realInput);
    expect(size).toEqual(214171);
  });
});
