import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { ProductoElement, Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styles: [`
  h1{
    text-align: center;
  }
  `
  ]
})
export class ListadoProductosComponent implements OnInit {

  public productos:ProductoElement[];
  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe( ({ productos }) => {
      this.productos = productos;
      console.log(productos);
    })
  }

}
