
//recibamos el objetivo de la API ghypy
//regresemos un objeto basado en nuestra interfaz de Gif

import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static mapGiphyItemToGif(Item: GiphyItem): Gif {
    return {
      id: Item.id,
      title: Item.title,
      url: Item.images.original.url
    };
  }

  static mapGiphyItemToGifArray(items: GiphyItem[]):Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
