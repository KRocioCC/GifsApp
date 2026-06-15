import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

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
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

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


