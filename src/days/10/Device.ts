import { Command, DeviceExecutionResponse } from "./types";

export class Device {
  execute = (commands: Command[]): DeviceExecutionResponse => {
    const response: DeviceExecutionResponse = {
      cycles: [],
      signalStrengthSum: 0,
      crt: [""],
    };

    let x: number = 1;
    let cycleNo = 1;
    let crtLine = 0;
    let spritePos = 1;

    commands.forEach((command) => {
      while (!command.completed) {
        if (cycleNo % 40 === 20) {
          response.crt.push("");

          response.cycles.push({
            cycleNo,
            x,
            signalStrength: cycleNo * x,
          });

          response.signalStrengthSum += cycleNo * x;
        }

        const output = command.startOrContinueExecution();

        let crtCol = (cycleNo - 1) % 40;
        response.crt[crtLine] +=
          crtCol >= spritePos - 1 && crtCol <= spritePos + 1 ? "#" : ".";

        if (command.completed) {
          x += output.value;
          spritePos += output.value;
        }

        cycleNo++;

        if (crtCol == 39) {
          crtLine++;
        }
      }
    });

    return response;
  };
}
