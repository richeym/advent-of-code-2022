import { BaseCommand } from "./BaseCommand";
import { CommandCycleResponse } from "../types";

export class AddxCommand extends BaseCommand {
  private cyclesToCompletion: number;

  constructor(params: string) {
    super(params);
    this.cyclesToCompletion = 2;
  }

  startOrContinueExecution = (): CommandCycleResponse => {
    this.cyclesToCompletion--;
    if (this.cyclesToCompletion === 0) {
      this.completed = true;
      return {
        completed: this.completed,
        value: parseInt(this.params),
      };
    }

    return {
      completed: this.completed,
      value: 0,
    };
  };
}
