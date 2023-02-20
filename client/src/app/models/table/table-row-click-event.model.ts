import {ColumnDescription} from './index';

export class TableRowClickEvent<T = any> {
  constructor(public column: ColumnDescription, public row: T, public index: number) {
  }
}