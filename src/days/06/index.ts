export const findStartOfPacketMarker = (
  input: string,
  packetSize: number
): number => {
  const len = input.length;

  for (let i = packetSize; i < len; i++) {
    const lastChars = input.slice(i - packetSize, i);

    if (new Set(lastChars).size === packetSize) {
      return i;
    }
  }

  throw Error("Unable to find start of packet markers");
};

export const getPart1Answer = (input: string): number => {
  return findStartOfPacketMarker(input, 4);
};

export const getPart2Answer = (input: string): number => {
  return findStartOfPacketMarker(input, 14);
};
