import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoElement } from '../../interfaces/producto.interface';
import { ProductosService } from '../../../services/productos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  .pie {
    text-align:center;
    margin-top: 2rem;
    
  }
  mat-list{
    margin-top: 9rem;
    
   text-align: right;
  }
  `
  ]
})
export class ProductoComponent implements OnInit {

  producto: ProductoElement;
  constructor( private activatedRoute: ActivatedRoute,
               private productosService: ProductosService,
               private router:Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.productosService.getProducto( id ) )
    )
    .subscribe( (producto:ProductoElement) => this.producto = producto )
    
  }


  regresar(){
    this.router.navigate(['/tienda/listado'])
  }
}
