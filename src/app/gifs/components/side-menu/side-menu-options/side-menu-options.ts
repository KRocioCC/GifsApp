import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gifs.service';

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
  gifService = inject(GifService);

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
