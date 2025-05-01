import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CalificacionListaResponse } from '../interfaces/calificacion';

@Injectable({
  providedIn: 'root'
})


export class CalificacionesService {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }


  traerBoletaCalificaciones():Observable<CalificacionListaResponse>{

    return this.http.get<CalificacionListaResponse>(`${this.apiBase}/traer-todas-boletas`).pipe(

      map(response =>{

        console.log('Boletas traidas correctamente, respuesta de la api:',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,2))

        return response;


      })
    )
  }







}
