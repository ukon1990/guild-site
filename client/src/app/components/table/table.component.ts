import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ColumnDescription, TableRowClickEvent} from '@models/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {UntypedFormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {sortRows} from '@utils/row-sort.util'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: ColumnDescription[] | undefined;
  @Input() data: any[] | undefined;
  @Input() footerRowData: any;
  @Input() defaultRowCount = 10;
  @Input() searchColumn: ColumnDescription | undefined;
  @Input() isLoading = true;
  @Input() isFormArray = false;
  @Output() rowClick: EventEmitter<TableRowClickEvent> = new EventEmitter();

  dataSource = new MatTableDataSource();
  searchField = new UntypedFormControl();
  columnKeys: string[] = [];
  sm = new Subscription();
  sortDirection: Sort | undefined;

  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor() {
  }

  /* istanbul ignore next */
  ngOnInit(): void {
    this.dataSource.sort = this.sort || null;
    if (this.paginator) {
      this.paginator.pageSize = this.defaultRowCount;
    }
    this.dataSource.paginator = this.paginator || null;
    this.sm.add(this.searchField.valueChanges.subscribe(value => this.search(value)));
  }

  /* istanbul ignore next */
  ngOnChanges({columns, data}: SimpleChanges): void {
    if (columns && columns.currentValue) {
      this.columnKeys = Object.keys(columns.currentValue);
    }

    if (data && data.currentValue) {
      this.sortRows(this.sortDirection, data.currentValue);
      this.search(this.searchField.value);
      this.isLoading = false;
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    }
  }

  /* istanbul ignore next */
  private setDataSource(data: any[]): void {
    this.dataSource.data = [...data];
  }

  search(value: any): void {
    if (this.searchColumn) {
      /*
      this.setDataSource(
        this.data.filter(
          obj =>
            TextUtil.isEmpty(value) ||
            TextUtil.contains(obj[this.searchColumn.key], value)
        )
      );
       */
    }
  }

  /* istanbul ignore next */
  sortRows(sort: Sort | undefined, data = this.data): void {
    this.sortDirection = sort;
    if (!sort || sort.direction === '') {
      this.setDataSource(data as any[]);
      return;
    }

    this.setDataSource(// @ts-ignore
      sortRows(data, this.columns[sort.active], sort.direction)
    );
  }

  handleColumnClick(column: ColumnDescription, row: any, index: number): void {
    this.rowClick.emit(new TableRowClickEvent(column, row, index));
  }
}
