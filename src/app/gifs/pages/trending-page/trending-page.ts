import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
// import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

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
export default class TrendingPage implements AfterViewInit {
  // gifs = imageUrls;

  //importamos el servicio
  gifService = inject(GifService);

  //injectamos el servicio para el scroll infinito
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  //Metodo del ciclo de vida de Angular, se ejecuta despues de que la vista se ha inicializado
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

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

    //Actualizamos la posicion del scroll en el servicio
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(!isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }
}
