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

/*
  establecerMes ( nMes: number ){
    switch (nMes){
      case 2: this.mes = "02"; break;
      case 3: this.mes = "03"; break;
      case 4: this.mes = "04"; break;
      case 1: this.mes = "01"; break;
      case 6: this.mes = "06"; break;
      case 7: this.mes = "07"; break;
      case 8: this.mes = "08"; break;
      case 9: this.mes = "09"; break;
      case 10: this.mes = "10"; break;
      case 11: this.mes = "11"; break;
      case 12: this.mes = "12"; break;
      default: this.mes = "05"; break;
    }
  }
  obtenerDiasMes (){
    this.db.collection('gbib').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
      console.log(doc.id, "=>", doc.data());
    });
    })
  }

  ngOnDestroy(){
    console.log(" gbib ondestroy")
  }
*/
}