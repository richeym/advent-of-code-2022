import { Command, DeviceCycle, DeviceExecutionResponse } from "./types";

export class Device {
  execute = (commands: Command[]): DeviceExecutionResponse => {
    const response: DeviceExecutionResponse = {
      cycles: [],
      signalStrengthSum: 0,
    };

    let x: number = 1;
    let cycleNo = 1;

    commands.forEach((command) => {
      while (!command.completed) {
        if ((cycleNo - 20) % 40 === 0) {
          response.cycles.push({
            cycleNo,
            x,
            signalStrength: cycleNo * x,
          });

          response.signalStrengthSum += cycleNo * x;
        }

        const output = command.startOrContinueExecution();

        if (command.completed) {
          x += output.value;
        }

        cycleNo++;
      }
    });

    return response;
  };
}
