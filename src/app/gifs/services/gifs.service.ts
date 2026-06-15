import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


//funciona para guardar el historial de busqueda en el localStorage
const GIF_KEY = "gifs";
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
}
// {
//   'goku': []
// }

// //Tipado para el historial de busqueda, es un objeto con clave string y valor un arreglo de gifs
// Record<string, Gif[]>

@Injectable({providedIn: 'root'})
export class GifService {

  private http =inject(HttpClient);

  //Para almacenar el estado de los gifs
  trendingGifs = signal<Gif[]>([]);
  trendingGifdLoading = signal(true);

  //para HISTORIAL
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  //Para mostrar los gifs en grupos de 3 [gif1, gif2, gif3], [gif4, gif5, gif6]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log(groups);
    return groups;
  });

  constructor() {
    this.loadTrendingGifs();
  }

  //Efecto para guardar el historial de busqueda en el localStorage cada vez que se actualice
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  //funcion para hacer la peticion HTTP a la API de Giphy
  loadTrendingGifs() {
    //se puede hacer peticiones, get, post, put, delete, patch
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    } ).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifdLoading.set(false);
      console.log({gifs});
    });
  }

  //funcion para buscar gifs por query
  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,

      }
    } )
    .pipe(
      map( ({data}) => data),
      map( (items) => GifMapper.mapGiphyItemToGifArray(items)),

      //Historial
      //Se hace una copia de esos gifs y se guardan en el historial
      //TODO: Historial
      tap( (items) => {
        this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,

        }));
      })
    );



    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
    //   console.log({search: gifs});
    // });
  }

  //Funcion para obtener los gifs del historial de busqueda
  getHistoryGifs(query:string){
    return this.searchHistory()[query] ?? [];
  }
}


