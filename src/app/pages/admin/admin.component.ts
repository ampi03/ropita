import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/model/productos';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  coleccionProductos: Productos[]=[];

  constructor(private servicioProductos: ProductosService) { }

  ngOnInit(): void {
    
    this.servicioProductos.obtenerProductos().subscribe(producto => this.coleccionProductos = producto) ;

  }

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    imagen: new FormControl('', Validators.required)//

  });

  imagen:string;
  textBoton: string;
  productoSeleccionado: Productos;
  
  eliminarVisible: boolean = false;
  modalVisible: boolean = false;

 


 agregarProducto() {
   if (this.producto.valid) {
     let nuevoProducto: Productos = {
       nombre: this.producto.value.nombre!,
       marca: this.producto.value.marca!,
       precio: this.producto.value.precio!,
       imagen: this.producto.value.imagen!,
       idproductos: ""
     }

     this.servicioProductos.creatProducto(nuevoProducto).then((producto) => {
       alert("El producto fue agregado con éxito");

     })
       .catch((error) => {
         alert("el producto  no pudo ser cargado\nERROR")
       }
       )
   }
   else {
     alert("el formulario no esta completo");
   }

 }
 mostrarDialogo() {
  this.textBoton = "Agregar Producto";

  this.modalVisible = true;
}

editarProducto() {
  let datos: Productos = {
    nombre: this.producto.value.nombre!,
    marca: this.producto.value.marca!,
    precio: this.producto.value.precio!,
    imagen: this.producto.value.imagen!,
    idproductos: this.productoSeleccionado.idproductos
  }
  this.servicioProductos.modificarProducto(this.productoSeleccionado.idproductos, datos).then((producto) => {
    alert("Se modifico el Producto");

  })
}

mostrarEditar(productoSeleccionado: Productos) {
  this.productoSeleccionado = productoSeleccionado;
  this.textBoton = "Editar Producto";
  this.modalVisible = true;

  this.producto.setValue({
    nombre: productoSeleccionado.nombre,
    marca: productoSeleccionado.marca,
    precio: productoSeleccionado.precio,
    imagen: productoSeleccionado.imagen
  })

}
cargarDatos() {
  if (this.textBoton == "Agregar Producto") {
    this.agregarProducto()
  }
  else if (this.textBoton == "Editar Producto") {
    this.editarProducto()
  }
  //se resentean los datos
  this.modalVisible = false;
  this.producto.reset();

}



mostrarEliminar(productoSeleccionado: Productos) {
  this.eliminarVisible = true
  this.productoSeleccionado = productoSeleccionado
}

borrarProducto() {
  this.servicioProductos.eliminarProducto(this.productoSeleccionado.idproductos).then((resp) => {
    alert("El Producto fue eliminado")


  })
  //para que se cierre el alerta passa
  this.eliminarVisible = false
}


cargarImagen(event:any){
  let archivo = event.target.files[0]; 
  
  //nos lee lo nuevo
  let reader = new FileReader()
  if (archivo!= undefined){
    reader.readAsDataURL(archivo)
    //que se quiere que se haga con lo que se lee
    reader.onloadend = () => {
      let url = reader.result;
      if(url!=null){
        
        this.imagen =url.toString();
      }
    }
  }
}

}
