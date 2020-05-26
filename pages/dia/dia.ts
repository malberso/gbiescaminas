import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// servicios proyecto
import { FechahoraService } from '../../app/fechahora.service';
import { GbibService } from '../../app/gbib.service';
// paginas proyecto
import { GuardiaPage } from '../guardia/guardia';
import { GuardiaNuevaPage } from '../guardia-nueva/guardia-nueva';

@Component({
  selector: 'page-dia',
  templateUrl: 'dia.html',
  styleUrls: ['./dia.scss']
})


export class DiaPage {

  private dactual: string;
  private guardias: any[];
  
  constructor(  public navCtrl: NavController,
                public navParams: NavParams, 
                private fechahoraSvc: FechahoraService,
                private gbibSrvc: GbibService
  ){
    //this.dactual = this.fechahoraSvc.obtenerFecha_AAAAMMDD();
    this.dactual = navParams.get('dia');
    this.obtenerGuardias();
  }

  ngOnDestroy(){
    this.gbibSrvc.libera_coleccionGuardias();
    //console.log(" dia ondestroy")
  }

  obtenerGuardias(){
    this.gbibSrvc.establecer_coleccionGuardias( this.dactual );
    this.gbibSrvc.obtenerGuardias ( (guardiasDB => { this.guardias = guardiasDB }));
  }

  consultarGuardia ( guardia: any){
    this.navCtrl.push(GuardiaPage, {'dia': this.dactual, 'guardia': guardia});
  }

  consultaGuardia ( ){
    this.navCtrl.push(GuardiaPage);
  }
/*
  guardarDia(){
    this.gbibSrvc.anyadirDia(this.dia);
  }
*/
  crearGuardia(){
    this.navCtrl.push(GuardiaNuevaPage, {'idDia': this.dactual })
  }
  eliminarGuardia(idGuardia: string){
    this.gbibSrvc.eliminarGuardia( idGuardia );
  }


}