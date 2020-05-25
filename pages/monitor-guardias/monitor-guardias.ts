import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FechahoraService } from '../../app/fechahora.service';
import { GbibService } from '../../app/gbib.service';

import { DiaPage } from '../dia/dia';

@Component({
  selector: 'page-monitor-guardias',
  templateUrl: 'monitor-guardias.html',
  styleUrls: ['./monitor-guardias.scss']
})
export class MonitorGuardiasPage {

  private dia: any;
  private diasApp: any[];
  private mostrarFooter: boolean = false;
  private nuevaFecha: any;

  constructor(  public navCtrl: NavController, 
                private fechahoraSvc: FechahoraService,
                private gbibSvc: GbibService
  ){
     this.obtenerDias();
  }

  ngOnDestroy(){
    this.gbibSvc.desconectarSuscripcion();
    console.log(" home ondestroy")
  }

  cambiaMostrarFooter(){
    this.mostrarFooter = !this.mostrarFooter;
  }

  obtenerDias(){
    this.gbibSvc.obtenerDias ( (diasDB => { this.diasApp = diasDB }));
  }

  consultarDia (id_dia: string ){
    this.navCtrl.push(DiaPage, {'dia': id_dia });
  }

  crearDia (){
    if(this.nuevaFecha){
      let nuevoDia = this.fechahoraSvc.convertirFechaJsYYYYMMDD(this.nuevaFecha);
      this.dia = {
        'id': nuevoDia
      }
      this.gbibSvc.crearDia(this.dia);
    }
    this.nuevaFecha = null;
  }
  
  eliminarDia (diaId: string){
    this.gbibSvc.eliminarDia(diaId);
  }
}