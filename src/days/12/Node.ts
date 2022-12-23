export class Node {
  readonly isStart: boolean;
  readonly isEnd: boolean;
  readonly elevation: number;

  constructor(rawNode: string) {
    this.isStart = rawNode === "S";
    this.isEnd = rawNode === "E";

    this.elevation = this.isStart
      ? "a".charCodeAt(0)
      : this.isEnd
      ? "z".charCodeAt(0)
      : rawNode.charCodeAt(0);
  }
}
