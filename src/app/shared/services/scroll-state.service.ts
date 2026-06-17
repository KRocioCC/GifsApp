import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  //para almacenar la posicion del scroll, para hacer scroll infinito
  trendingScrollState = signal(0);

}
