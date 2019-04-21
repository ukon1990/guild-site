import { LogSpec } from './log-spec';

export class Log {
  name: string;
  difficulty: number;
  kill: number;
  partition: number;
  size: number;
  specs: Array<LogSpec> = new Array<LogSpec>();
  variable: boolean;
}
