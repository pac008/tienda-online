import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
