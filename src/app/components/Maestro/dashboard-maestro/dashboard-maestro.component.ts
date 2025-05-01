import { Component , type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CursoServiceService } from '../../../services/curso-service.service';
import { MaestroServiceService } from '../../../services/maestro-service.service';
import { Maestro } from '../../../interfaces/maestro';
import { Curso } from '../../../interfaces/curso';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { Estudiante } from '../../../interfaces/estudiante';
import { TareaServiceService } from '../../../services/tarea-service.service';
import { Tarea } from '../../../interfaces/tarea';



@Component({
  selector: 'app-dashboard-maestro',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard-maestro.component.html',
  styleUrls: ['./dashboard-maestro.component.css']
})
export class DashboardMaestroComponent implements OnInit {

  mensajeError: string = '';
  mensajeExito: string = '';
  id_maestro: number = 1;
  id_curso: number = 1;
  infoMaestro: Maestro | null = null;
  infoCurso: Curso | null = null;
  cantidad_alumnos: number = 1;
  estudiantes: Estudiante[] = [];
  tareas:Tarea[] = [];
  cantidad_tareas: number = 1;



  constructor(private cursoService:CursoServiceService, private maestroService:MaestroServiceService, private router:Router,private estudianteService:EstudianteServiceService,
    private tareaService:TareaServiceService
  ){}


  ngOnInit(): void {

    this.obtenerIdMaestroyCurso();
  }


  obtenerIdMaestroyCurso():void{

    const maestroInfo = localStorage.getItem('maestro');

    if(maestroInfo){

      const maestroInformacionpersonal = JSON.parse(maestroInfo);

      if(maestroInformacionpersonal && typeof maestroInformacionpersonal.id === 'number' && typeof maestroInformacionpersonal.curso_id === 'number'){

        this.id_maestro = maestroInformacionpersonal.id;
        this.id_curso = maestroInformacionpersonal.curso_id;

        console.log('Datos obtenidos correctamente',JSON.stringify({

          id_maestro: maestroInformacionpersonal.id,
          id_curso: maestroInformacionpersonal.curso_id


        },null,2));

        this.obtenerInfoMaestro();
        this.obtenerInfoCurso();
        this.obtenerInfoEstudiantes();
        this.obtenerinfoTareas();
        

      }else{

        console.log('Error al buscar la informacion del maestro');
      }

    }
  }



  obtenerInfoMaestro():void{

    this.maestroService.obtenerInfoMaestro(this.id_maestro).subscribe({

      next: (response) =>{

        console.log('Informacion del maestro obtenida correctamente',JSON.stringify(response.data,null,2));

        this.infoMaestro = response.data;

        console.log('Hola::',this.infoMaestro);


      },
      error: (error) =>{

        this.mensajeError = 'Error al encontrar info del maestro';

        console.log('Ocurrio un error al traer los datos del maestro',JSON.stringify(error,null,2));

        setTimeout(() =>{

          this.mensajeError = '';


        },1400)

      }
    })

  }


  obtenerInfoCurso():void{

    this.cursoService.obtenerInfoCurso(this.id_curso).subscribe({

      next: (response) =>{

        console.log('Informacion del curso obtenido correctamente',JSON.stringify(response.data,null,2));

        this.infoCurso = response.data;

        console.log('Curso:',this.infoCurso);

        
      },

      error: (error) =>{

        this.mensajeError = 'Ocurrio un error al buscar el curso';

        console.log('Ocurrio un error al buscar la informacion del curso',JSON.stringify(error,null,2));

        setTimeout(() =>{
          this.mensajeError = '';

        },1400)


      }
    })
  }


  cerrarSesion():void{

    localStorage.removeItem('token_maestro');
    localStorage.removeItem('maestro');

    console.log('Sesion cerrada correctamente');


  }


  obtenerInfoEstudiantes():void{

    this.estudianteService.obtenerEstudiantes().subscribe({

      next: (response) =>{

        console.log('Informacion de todos los estudiantes obtenida correctamente',JSON.stringify(response.data,null,2));

        this.estudiantes = [...response.data]

        console.log('Estudiante:',this.estudiantes);

        this.cantidad_alumnos = response.data.length;


      },

      error: (error) =>{

        console.log('Error en la api:',JSON.stringify(error,null,2));

        


      }
    })
  }

  obtenerinfoTareas():void{

    this.tareaService.obtenerTareasdelCurso(this.id_curso).subscribe({

      next: (response) =>{

        console.log('Tareas del curso obtenidas correctamente');

        this.tareas = [...response.data];
        this.cantidad_tareas = response.data.length;

        console.log('Tareas:',this.tareas);

      },

      error: (error) =>{

        console.log('Error al obtener las taras del curso',JSON.stringify(error,null,2));

      }

    })
  }

  rutaCrearTarea():void{
    this.router.navigate(['/crear-tarea']);
  }

  rutaActualizarPerfil():void{

    this.router.navigate(['/editar-perfil'])
  }


  rutaEstudiantes():void{

    this.router.navigate(['/ver-alumnos'])


  }

  rutaTareas():void{

    this.router.navigate(['/ver-tareasm'])

  }


















}
