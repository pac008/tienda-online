import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarProductoComponent } from './productos/pages/agregar-producto/agregar-producto.component';
import { HomeComponent } from './productos/pages/home/home.component';
import { ListadoProductosComponent } from './productos/pages/listado-productos/listado-productos.component';
import { ProductoComponent } from './productos/pages/producto/producto.component';
import { CategoriasComponent } from './productos/categorias/categorias.component';


const routes: Routes = [
  {
    path: 'productos',
    component: HomeComponent,
    children:[
      { path: 'listado', component: ListadoProductosComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'agregar', component: AgregarProductoComponent  },
      { path: 'editar/:id', component: AgregarProductoComponent },
      { path: ':id', component: ProductoComponent},
      { path: '**', redirectTo: 'listado' },
    ]
  },
  
  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
