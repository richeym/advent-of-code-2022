export interface FSEntry {
  name: string;
  isDirectory: boolean;
  size: number;
  children: FSEntry[];
  parent?: FSEntry;
}

export interface TerminalCommand {
  command: string;
  args: string;
  outputs: string[];
}

export const parseTerminalOutput = (input: string): FSEntry => {
  const commandsAndOutputs = input.trim().split("\n$");

  const rootDir: FSEntry = {
    name: "/",
    isDirectory: true,
    size: 0,
    children: [],
  };

  const workingDir: FSEntry = rootDir;

  for (let commandAndOutput of commandsAndOutputs) {
    if (commandAndOutput.startsWith("$")) {
      const terminalCommand = parseTerminalCommand(commandAndOutput);

      if (terminalCommand.command === "ls") {
        storeFileSystemEntries(workingDir, terminalCommand.outputs);
      }
    }
  }

  return rootDir;
};

export const storeFileSystemEntries = (
  workingDir: FSEntry,
  entries: string[]
): void => {
  for (let entry of entries) {
    const [sizeOrDir, name] = entry.split(" ");

    workingDir.children.push({
      name,
      isDirectory: sizeOrDir === "dir",
      size: sizeOrDir !== "dir" ? parseInt(sizeOrDir) : 0,
      children: [],
      parent: workingDir,
    });
  }
};

export const executeCdCommand = (
  workingDir: FSEntry,
  path: string
): FSEntry => {
  let newWorkingDir = workingDir;

  if (path === "/") {
    while (newWorkingDir.parent) {
      newWorkingDir = newWorkingDir.parent;
    }
  } else if (path === "..") {
    if (newWorkingDir.parent) {
      newWorkingDir = newWorkingDir.parent;
    }
  } else {
    const subDir = newWorkingDir.children.find((x) => x.name === path);
    if (subDir) {
      newWorkingDir = subDir;
    }
  }

  return newWorkingDir;
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

export const getPart1Answer = (input: string): void => {
  return;
};

export const getPart2Answer = (input: string): void => {
  return;
};
