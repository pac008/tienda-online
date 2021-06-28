import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistroComponent implements OnInit {

  hide = true;
  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required ] ],
    correo: [ '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    confirmPassword: ['']
  },
  {
    validators: this.authService.passwordIguales('password','confirmPassword')
     
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

  guardar(){
    if ( this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

   this.authService.registro( this.miFormulario.value )
                             .subscribe( usuario => {
                               console.log( usuario);
                               this.router.navigate(['/login'])
                             },err => console.log( err ) )

    this.miFormulario.reset();
  }
}
