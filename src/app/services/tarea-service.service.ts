import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { TareaListaResponse, TareaRequestCreacion, TareaResponse } from '../interfaces/tarea';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class TareaServiceService {

  private apiBase = environment.api_Global;

  constructor(private http:HttpClient) { }


  //todas las Tareas

  obtenertodaslasTareas():Observable<TareaListaResponse>{

    return this.http.get<TareaListaResponse>(`${this.apiBase}/traer-tareas`).pipe(

      map(response =>{

        console.log('Tareas traidas correctamente: ',JSON.stringify({

          status:response.status,
          message: response.message,
          data:response.data,
          code:response.code


        },null,2))

        return response;
      })
    )
  }

  //funcion para crear una tarea

  crearTareaMaestro(id_maestro:number, datos:TareaRequestCreacion):Observable<TareaResponse>{

    return this.http.post<TareaResponse>(`${this.apiBase}/crear-tarea/${id_maestro}`,datos).pipe(

      map(response =>{

        console.log('Tarea creada exitosamente: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,2));

        return response;



      })
    )
  }

  obtenerTareasdelCurso(id_curso:number):Observable<TareaListaResponse>{

    return this.http.get<TareaListaResponse>(`${this.apiBase}/traer-tareas-curso/${id_curso}`).pipe(

      map(response =>{

        console.log('Tareas del curso obtenidas correctamente: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,2));


        return response;
      })

    )
  }


  entregarTarea(id_alumno:number,datos:FormData):Observable<TareaResponse>{

    return this.http.post<TareaResponse>(`${this.apiBase}/entrega-alumno/${id_alumno}`,datos).pipe(

      map(response =>{

        console.log('Tarea enviada correctamente:',JSON.stringify({

          status:response.status,
          message:response.message,
          code: response.code

        },null,3))

        return response;


      })

    )

  }



  obtenerIdEstudiante():number| null{

    const datosEstudiante = localStorage.getItem('estudiante');

    if(datosEstudiante){

      const info = JSON.parse(datosEstudiante);

      if(info && typeof info.id === 'number'){

        return Number(info.id);
      }

    }

    return null;

  }


  obtenerTareasEntrega(id_tarea:number):Observable<TareaResponse>{

    return this.http.get<TareaResponse>(`${this.apiBase}/ver-entrega-todoA/${id_tarea}`).pipe(

      map(response =>{

        console.log('Entregas traidas correctamente',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,3))

        return response;
      })

    )
  }













  








}
