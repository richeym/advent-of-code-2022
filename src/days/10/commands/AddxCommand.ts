import { BaseCommand } from "./BaseCommand";
import { CommandCycleResponse } from "../types";

export class AddxCommand extends BaseCommand {
  private timeRemaining: number;

  constructor(params: string) {
    super(params);
    this.timeRemaining = 2;
  }

  startOrContinueExecution = (): CommandCycleResponse => {
    this.timeRemaining--;
    if (this.timeRemaining === 0) {
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
