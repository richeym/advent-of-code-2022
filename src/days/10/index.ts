export interface Command {
  params: string;
  execute(): void;
}

abstract class BaseCommand implements Command {
  abstract execute(): void;

  constructor(public params: string) {}
}

export class NoopCommand extends BaseCommand {
  execute(): void {}
}

export class AddxCommand extends BaseCommand {
  execute(): void {
    throw new Error("Method not implemented.");
  }
}

export class Device {
  constructor(private readonly commands: Command[]) {}
}

export const parseInput = (input: string): Command[] => {
  const lines = input.trim().split("\n");
  const inputs: Command[] = [];

  for (const line of lines) {
    const [cmd, params] = line.split(" ");

    inputs.push(
      cmd === "noop" ? new NoopCommand(params) : new AddxCommand(params)
    );
  }

  return inputs;
};

export const getPart1Answer = (input: string): void => {
  return;
};
export const getPart2Answer = (input: string): void => {
  return;
};
