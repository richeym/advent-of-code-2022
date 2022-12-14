import { Command, DeviceCycle, DeviceExecutionResponse } from "./types";

export class Device {
  execute = (commands: Command[]): DeviceExecutionResponse => {
    const response: DeviceExecutionResponse = {
      cycles: [],
      signalStrengthSum: 0,
    };
    const cycles: DeviceCycle[] = [];

    let x: number = 1;

    let command = commands.shift();

    let cycleNo = 1;
    while (command && cycleNo <= 220) {
      const output = command.startOrContinueExecution();

      if (output.completed) {
        x += output.value;
        command = commands.shift();
      }

      cycles.push({
        cycleNo: cycleNo,
        x,
        signalStrength: cycleNo * x,
      });

      cycleNo++;
    }

    for (let i = 19; i < 220 && i < cycles.length; i += 40) {
      response.cycles.push(cycles[i]);
    }

    response.signalStrengthSum = response.cycles.reduce(
      (acc: number, curr: DeviceCycle) => {
        return acc + curr.signalStrength;
      },
      0
    );

    return response;
  };
}
