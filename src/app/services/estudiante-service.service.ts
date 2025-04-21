import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstudianteResponse } from '../interfaces/estudiante';
import { EstudianteCredenciales } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})


export class EstudianteServiceService {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }


  loginEstudiante(credenciales:EstudianteCredenciales):Observable<EstudianteResponse>{

    return this.http.post<EstudianteResponse>(`${this.apiBase}/login-estudiante`,credenciales).pipe(

      map(response =>{

        console.log('Login exitoso respuesta del backend',JSON.stringify({

          status:response.status,
          message: response.message,
          code:response.code
        },null,2))
        
        return response;
      })
    )
  }

  registroEstudiante(formData:FormData):Observable<EstudianteResponse>{

    return this.http.post<EstudianteResponse>(`${this.apiBase}/registro-alumno`,formData).pipe(

      map(response =>{

        console.log('Registro exitoso del estudiante,',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code,
          imagen: response.data.perfil_estudiante

        },null,2));


        return response;
      })



    )




  }











}
