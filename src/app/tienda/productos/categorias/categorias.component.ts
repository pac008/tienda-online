import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria, Categorias } from '../interfaces/producto.interface';

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
  constructor(private categoriasService: CategoriasService ) { }

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
    },err => console.log( err) );
  }

  actualizarCategoria(){
    if ( this.categoria.nombre.trim().length === 0 ) return;

    if( this.categoria._id ){
      this.categoriasService.actualizarCategoria( this.categoria ).subscribe( categoria => {
        console.log( categoria );
      }, err => console.log( err ) );
    } else {
      this.crearCategoria();
    }
  }

  borrarCategoria(){
    this.categoriasService.borrarCategoria( this.categoria._id ).subscribe( resp => {
      console.log(resp);
    },err => console.log(err) );
  }
}
