import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// servicios proyecto
import { GbibService } from '../../app/gbib.service';
import { FechahoraService } from '../../app/fechahora.service';

@Component({
  selector: 'page-guardia',
  templateUrl: 'guardia.html',
  styleUrls: ['./guardia.scss']
})
export class GuardiaPage {

  private dactual: string;
  private gactual: any;
  
  constructor(  public navCtrl: NavController,
                public navParams: NavParams, 
                private fechahoraSvc: FechahoraService,
                private gbibSvc: GbibService                
  ){
    //console.log("guardia=" + navParams.get('idGuardia'));
    this.dactual = navParams.get('dia');
    this.gactual = navParams.get('guardia');
  }
  ficharGuardia ( nombre: string ){
    for (var i = 0; i < this.gactual.profesores.length; i++){
      if (this.gactual.profesores[i].nombre == nombre){
        if (this.gactual.profesores[i].estado == 0){
          this.gactual.profesores[i].estado = 2;
        }else{
          this.gactual.profesores[i].estado = 0;
        }
        i=this.gactual.profesores.length;
      }
    }

    this.gbibSvc.crearGuardia(this.gactual);
  }
}