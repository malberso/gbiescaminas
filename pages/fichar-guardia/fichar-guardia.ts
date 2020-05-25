import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

// servicios proyecto
import { GbibService } from '../../app/gbib.service';

@Component({
  selector: 'page-fichar-guardia',
  templateUrl: 'fichar-guardia.html',
  styleUrls: ['./fichar-guardia.scss']
})
export class FicharGuardiaPage {

  private fechaId: string;
  private profesorId: string;
  private guardias: any[];

  constructor(  public navCtrl: NavController, 
                private alertCtrl: AlertController,
                public navParams: NavParams,
                private gbibSvc: GbibService 
  ){
    //console.log("fecha=" + navParams.get('fechaId') + "profesor=" + navParams.get('profesorId'));
    this.fechaId = navParams.get('fechaId');
    this.profesorId = navParams.get('profesorId');
    this.obtenerGuardias();
  }

  ngOnDestroy(){
    this.gbibSvc.libera_coleccionGuardias();
    console.log(" dia ondestroy")
  }

  obtenerGuardias(){
    this.gbibSvc.establecer_coleccionGuardias( this.fechaId );
    this.gbibSvc.obtenerGuardias ( (guardiasDB => { 
      this.guardias = guardiasDB;
      // Filtramos los resultados de las guardias eliminando aquellas que no tienen al profesor
      let long_guardias = this.guardias.length;
      for (let i=0; i<long_guardias; i++){
        let borrar: boolean = true;
        for (let j in this.guardias[i].profesores){
          if ( this.guardias[i].profesores[j].id ==  this.profesorId){
            borrar = false;
          }
        }
        if (borrar == true){
          this.guardias.splice(i,1);
          long_guardias=this.guardias.length;
          i--;
        }
      }
    }));
  }

  ficharGuardia ( guardia: any ){
    for (var i = 0; i < guardia.profesores.length; i++){
      if (guardia.profesores[i].id == this.profesorId){
        if (guardia.profesores[i].estado == 0){
          guardia.profesores[i].estado = 1;
        }else{
          guardia.profesores[i].estado = 0;
        }
      }
    }
    this.gbibSvc.crearGuardia(guardia);
  }
}