import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators';
import { Productos } from '../model/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productoCollection: AngularFirestoreCollection<Productos>
  constructor(private db: AngularFirestore) {
    this.productoCollection = db.collection('productos');
   }

   obtenerProductos(){
    return this.productoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
   }
  
   creatProducto(nuevoProducto: Productos) {
    return new Promise(async(resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoProducto.idproductos = id;
        //se guarda en variable
        const resultado =await this.productoCollection.doc(id).set(nuevoProducto);
        resolve(resultado)
      }
      catch (error) {
        reject(error)
      }
    })
  }

  modificarProducto(idproductos:string,nuevaData:Productos)
  {
    return this.db.collection('productos').doc(idproductos).update(nuevaData)
  }

  //para eliminar
  eliminarProducto(idproductos:string){
  return new Promise((resolve,reject)=>{
    try{
      const resp = this.productoCollection.doc(idproductos).delete()
      resolve(resp)
    }
    catch(error){
      reject(error)
    }
  })
  }
}
