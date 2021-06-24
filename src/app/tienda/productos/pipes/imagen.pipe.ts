import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( producto ): string {
    
    if ( !producto._id || producto.img === '' ) {
      return 'assets/productos/no-image.png'
    } else if( producto.img ) {
      return producto.img;
    } else {
      return `assets/productos/no-image.png`;
    } 
    }
  
}
