import { AddxCommand } from "./commands/AddxCommand";
import { Command } from "./types";
import { Device } from "./Device";
import { NoopCommand } from "./commands/NoopCommand";

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

export const getPart1Answer = (input: string): number => {
  const commands = parseInput(input);
  const device = new Device();
  const response = device.execute(commands);

  return response.signalStrengthSum;
};

export const getPart2Answer = (input: string): void => {
  return;
};
