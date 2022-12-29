export type NodeWeight = { [key: string]: number };

export type NodeKeys = { [key: string]: string | null };

export interface Route {
  distance: number;
  path: string[];
}
