import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria, Categorias } from '../interfaces/producto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {

  public categorias: Categoria[] = [
    {
      _id: '',
      nombre: ''
    }
  ];
  public categoria: Categoria = {
    _id: '',
    nombre: '',
    usuario: {
      _id:'',
      nombre:''
    }
  };
  
  public _id: string = '';
  constructor(private categoriasService: CategoriasService,
              private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe( ({ categorias }) => { 
      this.categorias = categorias;
    },err => console.log(err) );
  
  }

  getCategoria( id: string ){
    if ( id ) {
      this.categoriasService.getCategoria( id ).subscribe( categoria => {
        this.categoria = categoria;
      },err => console.log( err ) );
    } else {
      this.categoria = {
        _id: '',
        nombre: '',
        usuario: {
          nombre:'',
          _id:''
        }
      }
    }
  }

  crearCategoria(){
    this.categoriasService.crearCategoria( this.categoria.nombre ).subscribe( categoria => {
      console.log(categoria);
      this.mostrarSnackbar(`Categoría creada`);
      this.ngOnInit();
    },err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) );
  }

  actualizarCategoria(){
    if ( this.categoria.nombre.trim().length === 0 ) return;

    if( this.categoria._id ){
      this.categoriasService.actualizarCategoria( this.categoria ).subscribe( categoria => {
        console.log( categoria );
        this.mostrarSnackbar(`Categoría actualizada`);
        this.ngOnInit()
      },err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) );
    } else {
      this.crearCategoria();
    }
  }

  borrarCategoria(){
    this.categoriasService.borrarCategoria( this.categoria._id ).subscribe( resp => {
      console.log(resp);
      this.mostrarSnackbar(`Categoría borrada`);
      this.ngOnInit();
    },err => this.mostrarSnackbar(`Error!! ${ err.error.msg }`) );
  }
  
  mostrarSnackbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }
}
