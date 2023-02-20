import {Component, Input} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {ColumnDescription, TableRowClickEvent} from "@models/table";
import {ColumnType} from "@enums/table";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html'
})
export class ColumnComponent<T = any> {
  @Input() column!: ColumnDescription;
  @Input() index!: number;
  @Input() row: any;
  ColumnType = ColumnType;

  onSelectionChange({value}: MatSelectChange): void {
    if (this.column?.extraData) {
      const columnValue = this.row[this.column.key];
      if (columnValue.id && this.column?.extraData.data) {
        const result = this.column?.extraData.data.filter(option => option.id === value);
        if (result && result[0]) {
          this.row[this.column.key] = result[0];
        }
      } else {
        this.row[this.column.key] = value;
      }
    }
  }

  handleColumnButtonClick(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.column.extraData && this.column.extraData.onClick) {
      this.column.extraData.onClick(
        new TableRowClickEvent(this.column, this.row, this.index));
    }
  }
}
