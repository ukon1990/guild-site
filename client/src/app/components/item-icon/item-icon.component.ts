import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss']
})
export class ItemIconComponent implements OnChanges {
  @Input() size = 22;
  @Input() icon = 'inv_scroll_03';
  @Input() qualityId = 2;
  readonly iconBase = 'https://render-eu.worldofwarcraft.com/icons/56/';
  readonly hexColorMap = [
    '#9d9d9d', '#ffffff', '#1eff00', '#0070dd', '#a335ee', '#ff8000', '#e6cc80', '#00ccff', '#00ccff'
  ];
  styleIcon: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.icon && changes.icon.currentValue) {
      this.setIconStyle(changes.icon.currentValue);
    }
  }

  setIconStyle(icon: string): void {
    this.styleIcon = this.sanitizer.bypassSecurityTrustStyle(
      `url('https://render-eu.worldofwarcraft.com/icons/56/${
        icon
        }.jpg')`);
  }
}
