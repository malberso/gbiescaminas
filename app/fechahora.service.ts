import { Injectable } from '@angular/core';

@Injectable()
export class FechahoraService {

    private longFH = 14;

  constructor() { }

  // Función que devuelve
  obtenerFecha_AAAAMMDD(){
    var fecha: any = new Date();      

    return this.convertirFechaJsYYYYMMDD(fecha);     
  }

  obtenerHora_HHMMSS(){
    var fecha_id: string = "";
    var tmp: string = "";
    var fecha: any = new Date();

    //Obtenemos la hora   
    tmp = ""+fecha.getHours();
    if (tmp.length>1){
      fecha_id = fecha_id  + tmp;
    } else{
      fecha_id = fecha_id + '0' + tmp;
    }
    
    //Obtenemos los minutos   
    tmp = ""+fecha.getMinutes();
    if (tmp.length>1){
      fecha_id = fecha_id  + tmp;
    } else{
      fecha_id = fecha_id + '0' + tmp;
    }
    
    //Obtenemos los segundos   
    tmp = ""+fecha.getSeconds();
    if (tmp.length>1){
      fecha_id = fecha_id  + tmp;
    } else{
      fecha_id = fecha_id + '0' + tmp;
    }
    //console.log(fecha_id);
    return fecha_id; 
  }

  obtener_longFH(){
    return  this.longFH;
  }
  // Obtención del ID nuevo para Firebase
  obtener_IdFH(){
    var fecha_id: string = "";

    //Obtenemos el año, mes y dia AAAAMMDD
    fecha_id = "" + this.obtenerFecha_AAAAMMDD();
    //Obtenemos la hora minutos y segundos HHMMSS
    fecha_id = fecha_id + this.obtenerHora_HHMMSS();

    //console.log(fecha_id);
    return fecha_id;  
  }

  convertirFechaJsYYYYMMDD( fechaJs: Date ){
    var fecha_id: string = "";
    var tmp: string = "";
    var fecha: any = new Date(fechaJs);      

    //Obtenemos el año
    fecha_id = ""+fecha.getFullYear();
    
    //Obtenemos el mes corrigiendo que Javascript inicia el conteo de meses en 0
    let mes: number = fecha.getMonth() + 1; 
    tmp = ""+ mes;
    if (tmp.length>1){
      fecha_id = fecha_id  + tmp;
    } else{
      fecha_id = fecha_id + '0' + tmp;
    }
    
    //Obtenemos el dia
    tmp = ""+fecha.getDate();
    if (tmp.length>1){
      fecha_id = fecha_id  + tmp;
    } else{
      fecha_id = fecha_id + '0' + tmp;
    }
    return fecha_id; 
  }
}