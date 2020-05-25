import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
//Servicios para el proyecto
import { FechahoraService } from './fechahora.service';
import { GbibService } from './gbib.service';
//Paginas del proyecto
import { HomePage } from '../pages/home/home';
import { DiaPage } from '../pages/dia/dia';
import { GuardiaPage } from '../pages/guardia/guardia';
import { GuardiaNuevaPage } from '../pages/guardia-nueva/guardia-nueva';
import { MonitorGuardiasPage } from '../pages/monitor-guardias/monitor-guardias';
import { FicharSeleccionPage } from '../pages/fichar-seleccion/fichar-seleccion';
import { FicharGuardiaPage } from '../pages/fichar-guardia/fichar-guardia';

//Configuración conexion firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAmjdAHeHEqlD6xE3TmPS65BypH4oQdBw",
  authDomain: "guardias-a44d1.firebaseapp.com",
  databaseURL: "https://guardias-a44d1.firebaseio.com",
  projectId: "guardias-a44d1",
  storageBucket: "guardias-a44d1.appspot.com",
  messagingSenderId: "813918385950",
  appId: "1:813918385950:web:b614a6e48f0ee34c29fb0f",
  measurementId: "G-VESLHX7L3M"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiaPage,
    GuardiaPage,
    GuardiaNuevaPage,
    MonitorGuardiasPage,
    FicharSeleccionPage,
    FicharGuardiaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiaPage,
    GuardiaPage,
    GuardiaNuevaPage,
    MonitorGuardiasPage,
    FicharSeleccionPage,
    FicharGuardiaPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFirestore,
    FechahoraService,
    GbibService
  ]
})
export class AppModule {}