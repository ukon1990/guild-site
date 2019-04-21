import {Injectable} from '@angular/core';
import {Item} from '../models/character';
import {HttpClient} from '@angular/common/http';

class WowheadTooltip {
  name: string;
  quality: number;
  icon: string;
  tooltip: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getTooltip(item: Item): Promise<WowheadTooltip> {
    // https://www.wowhead.com/tooltip/item/158349&bonus=4817:1482&azerite-powers=5:504:42:14&json&power´
    let url = 'https://www.wowhead.com/tooltip/item/' + item.id;
    if (item.bonusLists) {
      url += '&bonus=' + item.bonusLists.join(':');
    }

    if (item.azeriteEmpoweredItem && item.azeriteEmpoweredItem) {
    }

    return this.http.get(url + '&json&power')
      .toPromise()
      .then((tooltip: WowheadTooltip) => {
        item.name = tooltip.name;
        return tooltip;
      }) as Promise<WowheadTooltip>;
  }
}
