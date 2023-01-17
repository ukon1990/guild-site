import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RoutingUtil} from "./utils/routing.util";
import {MenuItem} from "./models/menu-item.model";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appName = 'Guild site';
  private pageTitle: string | undefined;
  private subs = new Subscription();

  constructor(

    private router: Router,
    private title: Title
  ) {
    this.subs.add(
      this.router.events.subscribe(
      (event) =>
        this.onNavigationChange(event as NavigationEnd)));
  }

  private onNavigationChange(event: NavigationEnd) {
    /*
    if (TextUtil.contains(event.url, 'settings') || TextUtil.contains(event.url, 'about')) {
      this.isInNonAppDataPage = true;
    } else if (event.url) {
      this.isInNonAppDataPage = false;
    }*/

    // this.saveCurrentRoute(event);
    const menuItem: MenuItem | undefined = RoutingUtil.getCurrentRoute(event.url);
    if (menuItem) {
      this.pageTitle = menuItem.title;
      this.title.setTitle(`${this.appName} - ${menuItem.title}`);
    }
    window.scroll(0, 0);
  }
}
