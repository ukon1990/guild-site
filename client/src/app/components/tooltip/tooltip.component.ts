import {Component, Input} from '@angular/core';
import {WowheadTooltip} from '../../services/item.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() tooltip: WowheadTooltip;
}
