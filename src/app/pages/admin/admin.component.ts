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
    //se llama a la funcion del servicio y solo la podran ver o obtenerlos los que esten subcriptos, permite actualizar los datos el subscribe 
    this.servicioProductos.obtenerProductos().subscribe(producto => this.coleccionProductos = producto) ;

  }
  //se encuentra el formulario, el cual requiere de datos para no presentar alertas
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    imagen: new FormControl('', Validators.required)

  });

  imagen:string;
  textBoton: string;
  productoSeleccionado: Productos;
  
  //por ahora serán false, o sea que no serán visibles
  eliminarVisible: boolean = false;
  modalVisible: boolean = false;

 
//se rellena el formulario y se guardan los datos, agregados en el formulario
 agregarProducto() {
   if (this.producto.valid) {
     let nuevoProducto: Productos = {
       nombre: this.producto.value.nombre!,
       marca: this.producto.value.marca!,
       precio: this.producto.value.precio!,
       imagen: this.producto.value.imagen!,
       idproductos: ""
     }
     //si se agrega correctamente, aparece una alerta
     this.servicioProductos.creatProducto(nuevoProducto).then((producto) => {
       alert("El producto fue agregado con éxito");

     })//si hay un error, aparece una alerta avisando del tipo de error
       .catch((error) => {
         alert("el producto  no pudo ser cargado\nERROR")
       }
       )
   }//si no se rellenan todos los datos pedidos, aparece una alerta
   else {
     alert("el formulario no esta completo");
   }

 }
 
 //si se hace una interacción con el boton agregar productos, el formulario será visible
 mostrarDialogo() {
  this.textBoton = "Agregar Producto";

  this.modalVisible = true;
}
//es el formulario para editar los datos del producto
editarProducto() {
  let datos: Productos = {
    nombre: this.producto.value.nombre!,
    marca: this.producto.value.marca!,
    precio: this.producto.value.precio!,
    imagen: this.producto.value.imagen!,
    idproductos: this.productoSeleccionado.idproductos
  }
  //si se editan los datos correctamente, aparecerá un alert
  this.servicioProductos.modificarProducto(this.productoSeleccionado.idproductos, datos).then((producto) => {
    alert("Se modifico el Producto");

  })
}


mostrarEditar(productoSeleccionado: Productos) {
  //se toca el botón editar producto, dependiendo del producto que se edite
  this.productoSeleccionado = productoSeleccionado;
  this.textBoton = "Editar Producto";
  //si se toca el botón, aparece el modal visible, o sea true
  this.modalVisible = true;
 //una vez aparece el modalVisible, aparecerá con los datos anteriores
  this.producto.setValue({
    nombre: productoSeleccionado.nombre,
    marca: productoSeleccionado.marca,
    precio: productoSeleccionado.precio,
    imagen: productoSeleccionado.imagen
  })

}
//se usa un solo botón, que dependiendo de ciertas condiciones, hará distintas cosas
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
