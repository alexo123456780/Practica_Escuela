import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { RubricaP1Response } from '../interfaces/rubricap1';
import { environment } from '../../environments/environment';
import { RubricaP1Calificar } from '../interfaces/rubricap1';

@Injectable({
  providedIn: 'root'
})
export class RubricaP1Service {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }


  subirCalificacionP1(id_maestro:number, datos:RubricaP1Calificar):Observable<RubricaP1Response>{

    return this.http.post<RubricaP1Response>(`${this.apiBase}/calificar-parcial1/${id_maestro}`,datos).pipe(

      map(response => {

        console.log('Calificacion asignada correctamente del parcial1: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,2))

        return response;
      })
    )




  }






}
