import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators';
import { Productos } from '../model/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  //se declara a privada productocollection y de la base de datos se traeran los datos de productos
  private productoCollection: AngularFirestoreCollection<Productos>
  constructor(private db: AngularFirestore) {
    this.productoCollection = db.collection('productos');
   }
   //se obtienen los productos snapshotChanges obtiene datos, la tubería (pipe) nos permite modificar o transformar la información presentada en pantalla y el map crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
   obtenerProductos(){
    return this.productoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
   }
   //se crea un producto 
   creatProducto(nuevoProducto: Productos) {
    //la promesa existira hasta que se cumpla el objetivo y de ahi te devolvera una respuesta, y volvera a empezar.
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
  //de la base de datos trae la colección productos y de la coleccion trae el identificar de productos,
  //para saber cual se va a modificar.
  modificarProducto(idproductos:string,nuevaData:Productos)
  {
    return this.db.collection('productos').doc(idproductos).update(nuevaData)
  }

  //trae los datos del producto para eliminarlos
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
