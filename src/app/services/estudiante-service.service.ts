import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstudianteListaResponse, EstudianteResponse } from '../interfaces/estudiante';
import { EstudianteCredenciales } from '../interfaces/estudiante';
import { EstudiantePassword } from '../interfaces/estudiante';

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

  obtenerEstudiantes():Observable<EstudianteListaResponse>{

    return this.http.get<EstudianteListaResponse>(`${this.apiBase}/traer-alumnos`).pipe(

      map(response =>{

        console.log('Estudiantes obtenidos correctamente',JSON.stringify({

          status:response.status,
          message: response.message,
          code:response.code


        },null,2))

        return response;

      })

    )
  }


  obtenerInfoEstudiante(id_estudiante:number):Observable<EstudianteResponse>{

    return this.http.get<EstudianteResponse>(`${this.apiBase}/verinfo-estudiante/${id_estudiante}`).pipe(

      map(response =>{

        console.log('Info del alumno traida correctamente',JSON.stringify({

          status: response.status,
          message:response.message,
          code:response.code
        },null,2))

        return response;

      })
    )
  }


  actualizarInfoEstudiante(id_alumno:number ,datos:FormData):Observable<EstudianteResponse>{

    return this.http.post<EstudianteResponse>(`${this.apiBase}/editar-perfil-estudiante/${id_alumno}`,datos).pipe(

      map(response =>{

        console.log('Informacion actualizada correctamente',JSON.stringify({
          status:response.status,
          message:response.message,
          code:response.code

        },null,3))

        return response;
      })
    )
  }

  actualizarPassword(id_estudiante:number,password:EstudiantePassword):Observable<EstudianteResponse>{

    return this.http.put<EstudianteResponse>(`${this.apiBase}/editar-password/${id_estudiante}`,password).pipe(

      map(response =>{

        console.log('password actualizado correctamente',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,3))

        return response;
      })
    )
  }

























}
