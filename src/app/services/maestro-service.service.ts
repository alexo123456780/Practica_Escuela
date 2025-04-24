import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { MaestroResponse } from '../interfaces/maestro';
import { MaestroCredenciales } from '../interfaces/maestro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class MaestroServiceService {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }
  

  maestroLogin(credenciales:MaestroCredenciales):Observable<MaestroResponse>{

    return this.http.post<MaestroResponse>(`${this.apiBase}/login-maestro`,credenciales).pipe(

      map(response =>{

        console.log('Login exitoso:',JSON.stringify({

          status: response.status,
          message: response.message,
          code:response.code
        },null,2))


        return response;
      })

    )
  }


  registroMaestro(formData:FormData):Observable<MaestroResponse>{

    return this.http.post<MaestroResponse>(`${this.apiBase}/registro-maestro`,formData).pipe(

      map(response =>{

        console.log('Registro exitoso, respuesta del backend',JSON.stringify({

          status:response.status,
          message: response.message,
          code: response.code


        },null,2))

        return response;
      })

    )
  }

  obtenerInfoMaestro(id_maestro:number):Observable<MaestroResponse>{

    return  this.http.get<MaestroResponse>(`${this.apiBase}/buscar-maestro/${id_maestro}`).pipe(

      map(response =>{

        console.log('Datos del maestro obtenido correctamente:',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,2))


        return response;

      })
    )
  }

  actualizarDatosMaestro(id_maestro:number,datos:FormData):Observable<MaestroResponse>{

    return this.http.post<MaestroResponse>(`${this.apiBase}/update-maestro/${id_maestro}`,datos).pipe(

      map(response =>{

        console.log('Datos actualizados correctamente',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code
          
        },null,2));

        return response;


      })

    )

  }















}
