import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CursoResponse, CursosListaResponse } from '../interfaces/curso';


@Injectable({
  providedIn: 'root'
})


export class CursoServiceService {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }


  obtenerCursos():Observable<CursosListaResponse>{

    return this.http.get<CursosListaResponse>(`${this.apiBase}/mostrar-cursos`).pipe(

      map(response =>{

        console.log('Cursos obtenidos correctamente, respuesta de la api',JSON.stringify({

          status:response.status,
          message: response.message,
          data:response.data,
          code:response.code
        },null,2))


        return response;
      })
    )

  }

  obtenerInfoCurso(id_curso:number):Observable<CursoResponse>{

    return this.http.get<CursoResponse>(`${this.apiBase}/mostrar-unico-curso/${id_curso}`).pipe(

      map(response =>{

        console.log('Informacion del curso obtenido correctamente',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,2));


        return response;


      })




    )



  }









}
