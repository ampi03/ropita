import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Páginas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FooterComponent } from './pages/footer/footer.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';

// Servicios
import { UsuariosService } from './servicios/usuarios.service';
import { ProductosService } from './servicios/productos.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    MenuComponent,
    ContactoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    CarouselModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [UsuariosService, ProductosService], // servicios patentados
  bootstrap: [AppComponent]
})
export class AppModule { }
