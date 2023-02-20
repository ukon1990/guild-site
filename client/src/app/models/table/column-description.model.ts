import {TableRowClickEvent} from "@models/table";
import {ColumnType} from "@enums/table";

export class ColumnDescription<T = any> {
  public extraData?: {
    buttonIcon?: string;
    buttonColor?: 'warn' | 'accent' | 'primary';
    useIdColumn?: boolean;
    data?: any[];
    key?: string;
    onClick?: (event: TableRowClickEvent) => void;
    disabled?: boolean;
  };

  constructor(
    public key: string,
    public title: string,
    public type: ColumnType = ColumnType.TEXT,
    public pipeValue?: string,
    public customSortFunction?: any,
    public sticky: boolean = false,
    public stickyEnd: boolean = false) {
  }
}
