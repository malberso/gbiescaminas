import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class GbibService {

  private coleccionDias: AngularFirestoreCollection<any>;
  private coleccionProfesores: AngularFirestoreCollection<any>;
  private coleccionGuardias: AngularFirestoreCollection<any>;

  private suscGbib;
  private suscGuardias;
  private suscProfesores;
  //private mes: string = "05";

  constructor( private db: AngularFirestore ) {
    // Preparamos las conexiones a las colecciones base
    this.coleccionDias = this.db.collection('gbib');
    this.coleccionProfesores = this.db.collection('usuarios');
   }
  // Realiza la suscripción a la colección principal (dias con guardias)
  obtenerDias ( callback ){
    this.suscGbib = this.coleccionDias.valueChanges().subscribe( (diasGuardiaDB) => { 
      callback(diasGuardiaDB);
    });    
  }
  // Abandona la suscripción a la colección principal (dias con guardias)
  desconectarSuscripcion(){
    this.suscGbib.unsubscribe();
  }
  // Realiza una suscripción a la colección de profesores
  obtenerProfesores ( callback ){
    this.suscProfesores = this.coleccionProfesores.valueChanges().subscribe( ( profesores ) => {
      callback( profesores );
    });
  }
  // Abandona la suscripción a la colección de profesores
  libera_coleccionProfesores(){
    this.suscProfesores.unsubscribe();
  }
  // Prepara la colección de guardias para un dia de acuerdo a una fecha YYYYMMDD
  establecer_coleccionGuardias(id_dia: string){
    this.coleccionGuardias = this.db.collection('gbib/' + id_dia + '/guardias' );
  }
  // Realiza una suscripción a la subcolección de guardias de un dia.
  obtenerGuardias ( callback ){
    this.suscGuardias = this.coleccionGuardias.valueChanges().subscribe( ( guardias ) => {
      callback( guardias );
    });
  }
  // Abandona la suscripcion a las guardias
  libera_coleccionGuardias(){
    this.suscGuardias.unsubscribe();
  }

  crearDia ( ndia: any ){
    this.coleccionDias.doc(ndia.id).set(ndia);
  }

  eliminarDia (diaId: string){
    this.coleccionDias.doc( diaId ).delete();
  }

  crearGuardia ( nguardia: any ){
    var idGuardia: string = nguardia.hini + nguardia.hfin;
    
    this.coleccionGuardias.doc(idGuardia).set(nguardia);
  }

  eliminarGuardia ( guardiaId: string){
    this.coleccionGuardias.doc(guardiaId).delete();
  }

}