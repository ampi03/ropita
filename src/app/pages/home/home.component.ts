import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/model/productos';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  coleccionProductos: Productos[]=[];

  constructor(private servicioProductos: ProductosService) { }

  ngOnInit(): void {
    
    this.servicioProductos.obtenerProductos().subscribe(producto => this.coleccionProductos = producto);

  }

}
