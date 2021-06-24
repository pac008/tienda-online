import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule } from '@angular/forms';

import { ImagenPipe } from './productos/pipes/imagen.pipe';

import { TiendaRoutingModule } from './tienda-routing.module';
import { HomeComponent } from './productos/pages/home/home.component';
import { ListadoProductosComponent } from './productos/pages/listado-productos/listado-productos.component';
import { AgregarProductoComponent } from './productos/pages/agregar-producto/agregar-producto.component';

import { ProductoComponent } from './productos/pages/producto/producto.component';

import { ProductosService } from './services/productos.service';
import { ProductoTarjetaComponent } from './productos/components/producto-tarjeta/producto-tarjeta.component';
import { CategoriasService } from './services/categorias.service';
import { CategoriasComponent } from './productos/categorias/categorias.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListadoProductosComponent,
    AgregarProductoComponent,
    ProductoComponent,
    ImagenPipe,
    ProductoTarjetaComponent,
    
    CategoriasComponent
  ],
  providers:[
    ProductosService,
    CategoriasService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    TiendaRoutingModule,
    MaterialModule,
    MatFileUploadModule,
    MaterialFileInputModule
    
  ]
})
export class TiendaModule { }
