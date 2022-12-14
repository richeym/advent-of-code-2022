import { Command, CommandCycleResponse } from "../types";

export abstract class BaseCommand implements Command {
  abstract startOrContinueExecution(): CommandCycleResponse;
  completed: boolean = false;

  constructor(public params: string) {}
}
