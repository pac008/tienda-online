import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.url;
  constructor(private http: HttpClient) { }

  login({ correo, password }){
    return this.http.post(`${ this.url }/api/auth/login`, { correo, password });
  }

  registro({ nombre, correo, password }) {

    return this.http.post(`${ this.url }/api/usuarios`, { nombre, correo, password });
  }

  passwordIguales(pass1Name:string, pass2Name:string){

    return ( formGroup:FormGroup ) => {
          
      let pass1control = formGroup.controls[pass1Name];
      let pass2control = formGroup.controls[pass2Name];

      if( pass1control.value === pass2control.value ){
       pass2control.setErrors( null)
      }else {
        pass2control.setErrors({ noEsIgual:true})
      }
    }
  }
}
