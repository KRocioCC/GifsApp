import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
@Injectable({providedIn: 'root'})
export class GifService {

  private http =inject(HttpClient);

  //Para almacenar el estado de los gifs
  trendingGifs = signal<Gif[]>([]);
  trendingGifdLoading = signal(true);


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
  searchGifs(query: string) {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,

      }
    } ).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
      console.log({search: gifs});
    });
  }
}


