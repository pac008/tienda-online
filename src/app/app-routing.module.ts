import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then( m => m.TiendaModule )
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
