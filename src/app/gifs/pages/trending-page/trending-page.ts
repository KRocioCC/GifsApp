import { Component, ElementRef, inject, viewChild } from '@angular/core';
// import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';

// const imageUrls: string[] = [
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  // gifs = imageUrls;

  //importamos el servicio
  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    //variable para obtener el elemento del scroll
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    //Variable para obtener la posicion del scroll
    const scrollTop = scrollDiv.scrollTop;

    //Variable para obtener el alto del scroll
    const clientHeight = scrollDiv.clientHeight;

    //Variable para obtener el alto total del scroll
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log(scrollTop, clientHeight, scrollHeight);

    //Variable para saber si el scroll esta al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if(!isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }
}
