import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ColumnDescription} from '../../models/column-description';
import {Raider} from '../../models/raider';
import {Sorter} from '../../models/sorter';
import {PageEvent} from '@angular/material';
import {classColors, classes} from '../../models/classes';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges {

  @Input() id: any;
  @Input() iconSize: number;
  @Input() columns: Array<ColumnDescription>;
  @Input() data: Array<any>;
  @Input() numOfRows: number;

  @Output() change: EventEmitter<Raider> = new EventEmitter<Raider>();

  pageRows: Array<number> = [10, 20, 40, 80, 100];
  pageEvent: PageEvent = { pageIndex: 0, pageSize: this.pageRows[2], length: 0 };
  sorter: Sorter;
  previousLength = 0;
  classes: string[] = classes;

  constructor() {
    this.sorter = new Sorter();
  }

  ngAfterViewInit() {
    if (this.numOfRows) {
      this.pageEvent.pageSize = this.numOfRows;
    }
  }

  /* istanbul ignore next */
  ngOnChanges(change) {
    if (change && change.data && change.data.currentValue) {
      // this.pageEvent.length = change.data.currentValue.length;
      if (this.previousLength !== change.data.currentValue.length) {
        this.pageEvent.pageIndex = 0;
      }
      this.previousLength = change.data.currentValue.length;
      this.sorter.sort(this.data);
    }
  }

  /* istanbul ignore next */
  getFromValue(): number {
    if (!this.pageEvent || !this.pageEvent.pageSize) {
      return 0;
    }
    return (this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1)) - this.pageEvent.pageSize;
  }

  getClassColor(classIndex: number): string {
    return classColors[classIndex];
  }

  /* istanbul ignore next */
  pageChange(event: PageEvent): void {
    this.pageEvent = event;
  }

  /* istanbul ignore next */
  getToValue(): number {
    if (!this.pageEvent || !this.pageEvent.pageSize) {
      return this.pageRows[0];
    }
    return this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1);
  }

  sort(key: string): void {
    this.sorter.addKey(key);
    this.sorter.sort(this.data);
  }

  changeSpec(raider: Raider, spec): void {
    raider.specs.forEach(s => {
      if (spec.value === s.name) {
        raider.role = s.role;
      }
    });
    this.change.emit(raider);
  }

  timeToMinutesAndSeconds(time: number): string {
    let s = time / 1000;
    let m = Math.floor((time - s) / 60000);
    const h = Math.floor(m / 60);
    m = Math.floor(m % 60);
    s = Math.floor(s % 60);
    return `${
      this.getStringNumber(h)}:${
      this.getStringNumber(m)}:${
      this.getStringNumber(s)}`;
  }

  private getStringNumber(num: number): string {
    return num < 10 ? '0' + num :  '' + num;
  }
}
