import {ColumnType} from "@enums/table";
import {ColumnDescription} from "@models/table";


const sortRow = <T>(rowA: T, rowB: T, {key, type}: ColumnDescription, direction: string): number => {
  const a = (rowA as any)[key];
  const b = (rowB as any)[key];
  const isAsc = direction === 'asc';

  switch (type) {
    case ColumnType.NUMBER:
    case ColumnType.CURRENCY:
      return isAsc ? a - b : b - a;
    case ColumnType.TEXT:
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    case ColumnType.DATE:
      return isAsc ? +a - +b : +b - +a;
    default:
      return 0;
  }
};

export const sortRows = <T>(data: T[], column: ColumnDescription, direction: string): T[] => {
  return data.sort((a, b) =>
    sortRow<T>(a, b, column, direction));
};
