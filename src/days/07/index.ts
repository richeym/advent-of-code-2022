export interface Directory {
  name: string;
  subDirectories: Directory[];
  files: File[];
  parent?: Directory;
}

export interface File {
  name: string;
  size: number;
}

export interface TerminalCommand {
  command: string;
  args: string;
  outputs: string[];
}

export const parseTerminalOutputToFileSystem = (input: string): Directory => {
  const commandsAndOutputs = input
    .trim()
    .split("$")
    .map((x) => `\$ ${x.trim()}`);

  const rootDir: Directory = {
    name: "/",
    subDirectories: [],
    files: [],
  };

  let cwd: Directory = rootDir;

  for (let commandAndOutput of commandsAndOutputs) {
    const terminalCommand = parseTerminalCommand(commandAndOutput);

    if (terminalCommand.command === "ls") {
      storeFileSystemEntries(cwd, terminalCommand.outputs);
    } else if (terminalCommand.command === "cd") {
      cwd = executeCdCommand(cwd, terminalCommand.args);
    }
  }

  return rootDir;
};

export const storeFileSystemEntries = (
  cwd: Directory,
  entries: string[]
): Directory[] => {
  for (let entry of entries) {
    const [sizeOrDir, name] = entry.split(" ");

    if (sizeOrDir === "dir") {
      cwd.subDirectories.push({
        name,
        subDirectories: [],
        files: [],
        parent: cwd,
      });
    } else {
      cwd.files.push({
        name,
        size: parseInt(sizeOrDir),
      });
    }
  }

  return cwd.subDirectories;
};

export const executeCdCommand = (cwd: Directory, path: string): Directory => {
  let newCwd = cwd;

  if (path === "/") {
    while (newCwd.parent) {
      newCwd = newCwd.parent;
    }
  } else if (path === "..") {
    if (newCwd.parent) {
      newCwd = newCwd.parent;
    }
  } else {
    const subDir = newCwd.subDirectories.find((x) => x.name === path);
    if (subDir) {
      newCwd = subDir;
    } else {
      newCwd = storeFileSystemEntries(newCwd, [`dir ${path}`])[0];
    }
  }

  return newCwd;
};

export const parseTerminalCommand = (
  commandAndOutput: string
): TerminalCommand => {
  const splitCommandAndOutput = commandAndOutput.split("\n");

  const commandAndArgs = splitCommandAndOutput[0];
  const command = commandAndArgs.split(" ")[1];
  const args = commandAndArgs.split(" ").splice(2).join();
  const outputs = splitCommandAndOutput.splice(1);

  return { command, args, outputs };
};

export interface DirectoryMatch {
  directory: Directory;
  size: number;
}
export const getDirectorySize = (
  directory: Directory,
  matches: DirectoryMatch[] = [],
  sizeLimit: number = Number.MAX_SAFE_INTEGER
): number => {
  let size = 0;

  for (let entry of directory.files) {
    size += entry.size;
  }
  for (let entry of directory.subDirectories) {
    size += getDirectorySize(entry, matches, sizeLimit);
  }

  if (size <= sizeLimit) {
    matches.push({ directory, size });
  }

  return size;
};

export const getPart1Answer = (input: string): number => {
  const rootDirectory = parseTerminalOutputToFileSystem(input);
  const matches: DirectoryMatch[] = [];
  getDirectorySize(rootDirectory, matches, 100000);

  return matches.reduce((acc, curr) => {
    return (acc += curr.size);
  }, 0);
};

export const getPart2Answer = (input: string): number => {
  const rootDirectory = parseTerminalOutputToFileSystem(input);
  const matches: DirectoryMatch[] = [];
  const size = getDirectorySize(rootDirectory, matches);
  matches.sort((a, b) => {
    return a.size >= b.size ? 1 : -1;
  });

  const unusedSpace = 70000000 - size;
  const requiredSpace = 30000000 - unusedSpace;
  return matches.find((x) => x.size >= requiredSpace)!.size;
};
