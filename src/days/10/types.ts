export interface DeviceExecutionResponse {
  cycles: DeviceCycle[];
  signalStrengthSum: number;
  crt: string[];
}

export interface DeviceCycle {
  cycleNo: number;
  x: number;
  signalStrength: number;
}

export interface CommandCycleResponse {
  completed: boolean;
  value: number;
}

export interface Command {
  params: string;
  startOrContinueExecution(): CommandCycleResponse;
  completed: boolean;
}
