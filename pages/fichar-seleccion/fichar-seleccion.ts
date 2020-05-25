import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { GbibService } from '../../app/gbib.service';

import { FicharGuardiaPage } from '../fichar-guardia/fichar-guardia';

@Component({
  selector: 'page-fichar-seleccion',
  templateUrl: 'fichar-seleccion.html',
  styleUrls: ['./fichar-seleccion.scss']
})
export class FicharSeleccionPage {

  private fecha: any;
  private fechaId: string="";
  private profesorId: string="";
  private profesoresAp: any[];

  constructor(  public navCtrl: NavController, 
                private alertCtrl: AlertController,
                private gbibSvc: GbibService 
  ){
    this.obtenerProfesores();
  }

  ngOnDestroy(){
    this.gbibSvc.libera_coleccionProfesores();
    //console.log(" home ondestroy")
  }

  obtenerProfesores(){
    this.gbibSvc.obtenerProfesores ( (profesoresDB => { this.profesoresAp = profesoresDB }));
  }

  ficharGuardias ( ){ 
    if (this.fecha.length>0 && this.profesorId.length>0){
      this.fechaId = this.fecha.substr(0,4) + this.fecha.substr(5,2) + this.fecha.substr(8,2);
      this.navCtrl.push( FicharGuardiaPage, {'fechaId': this.fechaId, 'profesorId': this.profesorId} );
    }    
  }
}