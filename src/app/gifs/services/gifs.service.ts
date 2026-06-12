import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment.development';

@Injectable({providedIn: 'root'})
export class GifService {

  private http =inject(HttpClient);

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
      console.log({resp});
    });
  }
}


