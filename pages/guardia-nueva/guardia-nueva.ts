import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FechahoraService } from '../../app/fechahora.service';
import { GbibService } from '../../app/gbib.service';

@Component({
  selector: 'page-guardia-nueva',
  templateUrl: 'guardia-nueva.html',
  styleUrls: ['./guardia-nueva.scss']
})
export class GuardiaNuevaPage {

  private dactual: string;
  private profesoresAp: any[];
  /*private list_prof: [] = [
    {'nombre': "suso.gonzalez"}, {'nombre': "roman.carceller"}, {'nombre': "julio.leon"}
  ]*/
  private guardia: any = {
    "hini": "",
    "hfin": "",
    "profesores": []
    };
  private hini: string="14:30";
  private hfin: string="15:30";
  
  constructor(  public navCtrl: NavController,
                public navParams: NavParams, 
                private fechahoraSvc: FechahoraService,
                private gbibSvc: GbibService
  ){
    this.dactual = navParams.get('idDia');
    this.obtenerProfesores();
  }

  ngOnDestroy(){
    this.gbibSvc.libera_coleccionProfesores();
    //console.log(" guardia-nueva ondestroy")
  }


  obtenerProfesores(){
    this.gbibSvc.obtenerProfesores ( (profesoresDB => { this.profesoresAp = profesoresDB }));
  }

  crearGuardia (){
    if(this.hini < this.hfin){
      this.guardia.hini = this.hini.substr(0,2) + this.hini.substr(3,2);
      this.guardia.hfin = this.hfin.substr(0,2) + this.hfin.substr(3,2);
      this.gbibSvc.crearGuardia(this.guardia);
      //console.log("hini="+this.guardia.hini+" hfin="+this.guardia.hfin);
    }
  }

  cancelarDatos(){
    this.hini="";
    this.hfin="";
    this.guardia.hini="";
    this.guardia.hfin="";
    this.guardia.profesores=[];
  }

  guardarProfesores (valor: any){
    //vaciamos los profesores anteriores    
    this.guardia.profesores.length = 0;
    //cargamos la nueva selección de profesores
    for (let i in valor){
      valor[i].estado=0;
      this.guardia.profesores.push(valor[i]);
    }
  }
}