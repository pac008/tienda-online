import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { FileInput } from 'ngx-material-file-input';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { ProductosService } from '../../../services/productos.service';
import { ProductoElement, Categoria } from '../../interfaces/producto.interface';
import { CategoriasService } from '../../../services/categorias.service';



@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styles: [
  ]
})
export class AgregarProductoComponent implements OnInit {
  

  public categorias: Categoria[] | Categoria = [ {
    _id: '',
    nombre: ''
  }];
  
  public producto:ProductoElement = {
    categoria: '',
    descripcion: '',
    nombre: '',
    precio: 0,
    disponible: true,
    img: '',      
  };

  public imagen:FileInput;
  constructor(private productosService: ProductosService,
              private categoriasService: CategoriasService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    
    if ( !this.router.url.includes('editar') ) return;
    
    this.obtenerProductoPorId();
  }

  obtenerProductoPorId(){
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.productosService.getProducto( id ) )
      )
      .subscribe( (producto:ProductoElement) => {
        
        this.producto = producto; 
        this.producto.categoria = producto.categoria['_id'];
      })
  }

  obtenerCategorias(){
    this.categoriasService.getCategorias().subscribe( ({ categorias }) => {
      this.categorias = categorias;
    })
  }

  borrarProducto(){
    const dialog = this.dialog.open( ConfirmarComponent, {
      data: { ...this.producto }
    });

    dialog.afterClosed().pipe( 
      switchMap( resp => resp ? this.productosService.borrarProducto( this.producto._id ) : '' )
      )
      .subscribe( resp => {
        this.router.navigate(['/tienda/listado'])
      }, err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) );
  }
  guardar() {
     
    if ( this.producto.nombre.trim().length === 0 ) return;

    if ( this.producto._id ) {
      //Actualizar
      if( this.imagen ) {
        this.actualizarImagenProducto( this.producto._id );
      }
      this.productosService.actualizarProducto( this.producto )
      .subscribe( (producto: ProductoElement) => {
                this.producto = producto; 
                this.mostrarSnackbar('producto actualizado')
      }, err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) )
    } else {

      //Crear
      this.productosService.agregarProducto( this.producto )
                    .subscribe( (producto:ProductoElement) => {
                        this.actualizarImagenProducto( producto._id );
                      
                    }, err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) );
    }

  }

  actualizarImagenProducto( idProducto: string ){
    
    this.productosService.agregarImagenProducto( this.imagen.files[0], idProducto )
                .subscribe( resp => {
                    console.log( resp );
                    this.router.navigate(['/tienda/listado']); 
                    this.mostrarSnackbar('Producto registrado')
                }, err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) )
  }

  mostrarSnackbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }
}
