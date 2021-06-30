import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Categorias, Categoria } from '../productos/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  private url = environment.url;
  private token = localStorage.getItem('token');
  private opcions = new HttpHeaders ({
    'x-token': this.token
  });
  constructor(private http: HttpClient ) { }

  getCategoria( id:string ){
    return this.http.get<Categoria>(`${ this.url }/api/categorias/${ id }`);
  }
  getCategorias(){
    return this.http.get<Categorias>(`${ this.url }/api/categorias`);
  }

  crearCategoria( nombre:string ){
    console.log({nombre});
    return this.http.post(`http://localhost:8080/api/categorias`, { nombre }, { headers: this.opcions });
  }
  actualizarCategoria({ _id, nombre }){
    return this.http.put(`${ this.url }/api/categorias/${ _id }`,
    { nombre }, { headers: this.opcions });
  }

  borrarCategoria( id:string ){
     return this.http.delete(`${ this.url }/api/categorias/${id}`,{ headers: this.opcions })
  }
}
