import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from '../../models/menu-item.model';
import {faBars, faEllipsisV, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from "rxjs";
import {RoutingUtil} from "../../utils/routing.util";

declare function require(moduleName: string): any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy, OnInit {
  numberOfUndercutAuctions = 0;
  sm = new Subscription();
  isUserSet: boolean | undefined;
  menuItems: MenuItem[] = [];
  faEllipsisV = faEllipsisV;
  faUserPlus = faUserPlus;
  faBars = faBars;

  constructor() {
  }

  ngOnInit(): void {
    this.menuItems = RoutingUtil.getMenu();
  }

  ngOnDestroy(): void {
    this.sm.unsubscribe();
  }

  isSmallScreen(): boolean {
    // @ts-ignore
    return window.innerWidth < 991.98;
  }

  displayExtraMenu(): boolean {
    // @ts-ignore
    return window.innerWidth < 1325;
  }

  doNotClose(event: MouseEvent): void {
    if (event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
