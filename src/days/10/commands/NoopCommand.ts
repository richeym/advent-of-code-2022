import { BaseCommand } from "./BaseCommand";
import { CommandCycleResponse } from "../types";

export class NoopCommand extends BaseCommand {
  startOrContinueExecution = (): CommandCycleResponse => {
    this.completed = true;
    return {
      completed: this.completed,
      value: 0,
    };
  };
}
