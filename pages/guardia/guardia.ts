import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FechahoraService } from '../../app/fechahora.service';

@Component({
  selector: 'page-guardia',
  templateUrl: 'guardia.html',
  styleUrls: ['./guardia.scss']
})
export class GuardiaPage {

  private gactual: string;
  
  constructor(  public navCtrl: NavController,
                public navParams: NavParams, 
                private fechahoraSvc: FechahoraService
  ){
    //console.log("guardia=" + navParams.get('idGuardia'));
    this.gactual = this.fechahoraSvc.obtenerHora_HHMMSS();
  }

}