import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
import { ProductosService } from '../../../services/productos.service';
import { ProductoElement, Categoria } from '../../interfaces/producto.interface';
import { map, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder,
              private productosService: ProductosService,
              private categoriasService: CategoriasService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

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
      this.categorias = categorias
      console.log( categorias );
    })
  }

  borrarProducto(){
    this.productosService.borrarProducto( this.producto._id ).subscribe( resp => { console.log( resp ) }, err => console.log( err) )
  }
  guardar() {
     
    if ( this.producto.nombre.trim().length === 0 ) return;

    if ( this.producto._id ) {
      //Actualizar
      this.productosService.actualizarProducto( this.producto )
      .subscribe( (producto: ProductoElement) => {
                this.producto = producto; 
                //this.mostrarSnackbar('producto actualizado')
              }, err => console.log( err ) )
    } else {

      //Crear
      this.productosService.agregarProducto( this.producto )
                    .subscribe( (producto:ProductoElement) => {
                
                        console.log(producto);
                        this.actualizarImagenProducto( producto._id );
                      
                      
                    }, err => console.log(err) );
    }

  }

  actualizarImagenProducto( idProducto: string ){
    
    this.productosService.agregarImagenProducto( this.imagen.files[0], idProducto )
                .subscribe( resp => {
                    console.log( resp );
                    this.router.navigate(['/productos/editar', this.producto._id ]) 
                    //this.mostrarSnackbar('Heroe registrado')
                }, err => console.log(err))
  }

}
