import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  miFormulario: FormGroup = this.fb.group({
    correo: [ '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: [ '', [ Validators.required ] ],
  });
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  
   elCampoNoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }
  login(){
    if ( this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.authService.login( this.miFormulario.value )
          .subscribe( resp => {
              console.log(resp);
              this.router.navigate(['/tienda'])
          }, err => console.log( err ))

  }
}
