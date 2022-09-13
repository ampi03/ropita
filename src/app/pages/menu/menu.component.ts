import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuarios } from 'src/app/model/usuarios';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = "Menubar";
  
  // Formulario de Usuarios
  Usuarios = new FormGroup({
    nombreusuario: new FormControl ('', Validators.required),
    contrasena: new FormControl ('', Validators.required)
  })
  

  // Declaraciones
  items: MenuItem[] = [];
  adminVisible = false;
  coleccionUsuario: Usuarios[] = [];

  //modalvisible es para mostrar el form
  modalVisible : boolean = false;
  showModalDialog() {
    this.modalVisible = true;
  }

 
  //MOSTRAMOS EL VERIFICAR USUARIO
  mostrar(){
    this.verificarUsuario();
  }

  //SE CUMPLE UNA CONDICIÓN EN LA QUE SI SE INGRESA TAL CONTRASEÑA Y NOMBRE DE USUARIO, VA A PASAR ALGO
  verificarUsuario(){
    this.coleccionUsuario.forEach(usuario => {
      if(this.Usuarios.valid){
        if(usuario.nombreusuario===this.Usuarios.value.nombreusuario!){
          if(usuario.contrasena===this.Usuarios.value.contrasena!){
            alert ("Inicio sesión correctamente")
            this.adminVisible=true;
            this.ngOnInit()
          }else{
            alert ("La contraseña es incorrecta")
          }
        }
        else{
          alert ("algunos de los datos son incorrectos")
        }
      }else{
        alert("los campos están vacios")
      }
      this.modalVisible=false;
      this.Usuarios.reset();
    });
  }

  // Inyección con Servicios
  constructor(
    private serviciosUsuarios: UsuariosService,
  ){}

 
  // ES EL NGONINIT - MENU
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        routerLink: '/contacto',
      },
      {
        label: 'Admin',
        icon: 'pi pi-user-plus',
        routerLink: '/admin',
        visible: this.adminVisible,
      },
    ] 
    this.serviciosUsuarios.obtenerUsuarios().subscribe(usuarios=>this.coleccionUsuario=usuarios)
  }
}