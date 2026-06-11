import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuOption {
  label: string;
  route: string;
  subLabel: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export default class SideMenuOptions {
  menuOptions: MenuOption[] = [
    {
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Buscar gifs',
      icon: 'fa-solid fa-magnifying-glass',
    },
    {
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Gifs Populares',
      icon: 'fa-solid fa-chart-line',
    },
  ];

}
