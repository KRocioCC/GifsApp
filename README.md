# GifsApp ✨

GifsApp es una aplicación web interactiva que permite buscar y visualizar GIFs en tiempo real consumiendo la API de Giphy, almacenando un historial de búsquedas recientes mediante persistencia en LocalStorage. Desarrollada con Angular, la app implementa una arquitectura basada en componentes reutilizables, control de estado reactivo mediante Angular Signals, servicios centralizados para peticiones HTTP y un diseño responsivo, estilizado y personalizado con Tailwind CSS.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.12.

## Development server

To start a local development server, run:

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Iniciar el servidor con `ng serve -o`
4. Navegar a `http://localhost:4200/`

### CAPTURAS 
<br /><br />
<img width="1439" height="771" alt="Captura de Pantalla 2026-06-17 a la(s) 19 35 28" src="https://github.com/user-attachments/assets/2d067184-1cbf-4f3b-af8c-05df7d2017ec" />
<br /><br />
<img width="1439" height="771" alt="Captura de Pantalla 2026-06-17 a la(s) 19 43 17" src="https://github.com/user-attachments/assets/1099f26a-390b-4264-87d0-ff07ccbd8fda" />
<br /><br />
<img width="1438" height="771" alt="Captura de Pantalla 2026-06-17 a la(s) 19 39 37" src="https://github.com/user-attachments/assets/39c6df42-a862-4109-8166-c1d29b4e9c9e" />
<br /><br />
<img width="1440" height="771" alt="Captura de Pantalla 2026-06-17 a la(s) 19 40 35" src="https://github.com/user-attachments/assets/90cfa1de-18f4-4a62-9bd3-2acd0845f54b" />
<br /><br />
<img width="1440" height="777" alt="Captura de Pantalla 2026-06-17 a la(s) 19 41 09" src="https://github.com/user-attachments/assets/8b0f5f6c-fb7c-47ff-8299-bf0c092317a3" />
<br /><br />


#### PARA TAILWIND

DOCUMENTACION SE ENCUENTRA EN:https://tailwindcss.com/docs/installation/framework-guides/angular

Instalar con: 
```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```
#### PARA ICONOS

https://cdnjs.com/libraries/font-awesome/6.7.1

copear el "copy link tag" y agregarlo al index.html base del proyecto

#### PARA EL GRID DE IMAGENES
https://flowbite.com/docs/components/gallery/

#### PARA LA API DE GIFS
(seleccionar Create A New API Key y al finalizar la creacion nos dara una direccion url de la APIKEY)
https://developers.giphy.com/dashboard/?create=true

- https://developers.giphy.com/explorer/   (para el trending)

(probamos en postman)
https://api.giphy.com/v1/gifs/trending?api_key=vl3aLDVRYjF8moaB9FWc9AxJWPx7f3h9&limit=25&offset=0&rating=g&bundle=messaging_non_clips
