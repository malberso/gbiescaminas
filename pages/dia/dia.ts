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

  private dias: any[] = [
    "20200505", "20200506", "20200507", "20200508", "20200509", "20200510", "20200511", "20200512"
  ];
  private dia: any = {
    "id": "20200505",
    "guardias": [
      {
        "hini": "0800",
        "hfin": "0855",
        "profesores": [
          {
            "nombre": "miguel.albert",
            "estado": 0
          },
          {
            "nombre": "julio.leon",
            "estado": 1
          }
        ]
      },
      {
        "hini": "0855",
        "hfin": "0950",
        "profesores": [
          {
            "nombre": "roman",
            "estado": 0
          },
          {
            "nombre": "suso",
            "estado": 0
          }
        ]
      },    
    ]
  }

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
    console.log(" dia ondestroy")
  }

  obtenerGuardias(){
    this.gbibSrvc.establecer_coleccionGuardias( this.dactual );
    this.gbibSrvc.obtenerGuardias ( (guardiasDB => { this.guardias = guardiasDB }));
  }

  consultarGuardia (idGuardia: string){
    //console.log(idGuardia);
    this.navCtrl.push(GuardiaPage, {'idGuardia': idGuardia});
  }

  consultaGuardia ( ){
    this.navCtrl.push(GuardiaPage);
  }

  guardarDia(){
    this.gbibSrvc.anyadirDia(this.dia);
  }

  crearGuardia(){
    this.navCtrl.push(GuardiaNuevaPage, {'idDia': this.dactual })
    /*for (let nguardia of this.dia.guardias){
      this.gbibSrvc.crearGuardia(this.dia, nguardia);
      //console.log("hora inicial: " + nguardia.hini);
    }*/
  }
  eliminarGuardia(idGuardia: string){
    this.gbibSrvc.eliminarGuardia( idGuardia );
  }


}