import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { ProductoElement } from '../../interfaces/producto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styles: [`
  h1{
    text-align: center;
  }
  div.polaroid:hover{
    width: auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 6px 0 rgba(0, 0, 0, 0.4);
  }
  `
  ]
})
export class ListadoProductosComponent implements OnInit {

  public productos:ProductoElement[];
  constructor(private productosService: ProductosService,
              private router: Router) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe( ({ productos }) => {
      this.productos = productos;
      console.log(productos);
    })
  }

}
