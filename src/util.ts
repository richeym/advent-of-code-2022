import * as fs from 'fs';
import path from 'path';

const readFileToString = (fileName: string) : string => {
  return fs.readFileSync(fileName).toString();
}

export { readFileToString }