import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MonitorGuardiasPage } from '../monitor-guardias/monitor-guardias';
import { FicharSeleccionPage } from '../fichar-seleccion/fichar-seleccion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePage {

  constructor(  public navCtrl: NavController, 
                private alertCtrl: AlertController 
  ){

  }

  ngOnDestroy(){
    //console.log(" home ondestroy")
  }

  consultaDia ( ){
    this.navCtrl.push( MonitorGuardiasPage );
  }

  ficharGuardiaProfesor(){
    this.navCtrl.push( FicharSeleccionPage );
  }
}