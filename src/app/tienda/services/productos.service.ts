import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Producto, Categorias } from '../productos/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = environment.url;
  private token = localStorage.getItem('token');
  private opcions = new HttpHeaders({
    'x-token': this.token
  });
  constructor(private http: HttpClient ) {
  }

 

  getProducto( id ){
    return this.http.get(`${ this.url }/api/productos/${ id }`);
  }
  getProductos(){
    return this.http.get<Producto>(`${this.url}/api/productos`);
  }

  actualizarProducto( producto ){
    const { _id, categoria, nombre, descripcion, precio } = producto;
    return this.http.put(`${ this.url }/api/productos/${ _id }`, 
    { categoria, nombre, descripcion, precio },
    { headers: this.opcions });
  }

  borrarProducto( id ){
    return this.http.delete(`${ this.url }/api/productos/${ id }`,
    { headers: this.opcions });
  }

  agregarImagenProducto( archivo, id ){
    const formData = new FormData();
    formData.append('archivo', archivo);
   
    return this.http.put(`${ this.url }/api/uploads/productos/${ id }`, formData)
  }
  agregarProducto( { categoria, nombre, descripcion, precio } ){
    
    return this.http.post(`${ this.url }/api/productos`, 
    { categoria, nombre, descripcion, precio }, 
    { headers: this.opcions })
    
  }

}
