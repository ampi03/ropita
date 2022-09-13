import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'contacto', component:ContactoComponent
  },
  {
    path:'admin', component:AdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
