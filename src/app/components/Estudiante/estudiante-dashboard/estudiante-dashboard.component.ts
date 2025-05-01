import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { CursoServiceService } from '../../../services/curso-service.service';
import { Curso } from '../../../interfaces/curso';
import { Estudiante } from '../../../interfaces/estudiante';


@Component({
  selector: 'app-estudiante-dashboard',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './estudiante-dashboard.component.html',
  styleUrls: ['./estudiante-dashboard.component.css']
})
export class EstudianteDashboardComponent implements OnInit {

  estaCargando:boolean = false;
  mensajeExito: string = '';
  mensajeError:string = '';
  cursos: Curso[] = [];
  id_estudiante: number | null = null;
  estudiante: Estudiante | null = null;
  

  constructor(private estudianteService:EstudianteServiceService, private cursoService:CursoServiceService,private router:Router){}

  ngOnInit(): void {

    this.obtenerIdEstudiante();
    this.obtenerCursos();
    
  }

  obtenerIdEstudiante():number | null {

    const informacionEstudiante = localStorage.getItem('estudiante');

    if(informacionEstudiante){

      const estudiante = JSON.parse(informacionEstudiante);

      if(estudiante && typeof estudiante.id === 'number'){

        this.id_estudiante = estudiante.id;
        console.log(this.id_estudiante);
        this.obtenerInfoEstudiante();

        return Number(this.id_estudiante);

      }else{

        console.log('No se hayo informacion acerca del estudiante');
      }

    }

    return null;

  }

  obtenerCursos():void{

    this.estaCargando = true;

    this.cursoService.obtenerCursos().subscribe({

      next:(response) =>{

        this.estaCargando = false;

        if(response.data.length === 0){

          this.mensajeExito = 'Aun no hay cursos disponibles';

          setTimeout(() =>{

            this.mensajeExito = '';
          },1400)
        }

        this.mensajeExito = 'Cursos obtenidos correctamente';

        this.cursos = [...response.data];

      
        console.log(this.cursos);

        setTimeout(() =>{

          this.mensajeExito = '';
        },1400)

       
      },

      error: (error) =>{

        this.estaCargando = false;

        if(error.status === 500){

          this.mensajeError = 'Ocurrio un error interno el el sistema intentelo nuevamente o mas tarde';

          console.log(error);

          setTimeout(() =>{

            this.mensajeError = '';


          },1400)

        }
      }
    });
  }


  obtenerInfoEstudiante():void{

    if(this.id_estudiante){

      this.estaCargando = true;

      this.estudianteService.obtenerInfoEstudiante(this.id_estudiante).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Se obtuvo correctamente la info del estudiante';

          this.estudiante = response.data;

          console.log(this.estudiante);


          setTimeout(() =>{

            this.mensajeExito = '';

          },1400)
          

        },

        error: (error) =>{

          this.estaCargando = false;

          if(error.status === 400){

            this.mensajeError= 'No se encontro la informacion del estudiante o no se ha registrado aun'

          }

          if(error.status === 500){

            this.mensajeError = 'Ocurrio un error interno en la solicitud espere porfavor';

          }

          console.log(JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';


          },1400)


        }
      });

    }

  }


  cerrarSesion():void{

    localStorage.removeItem('estudiante');
    localStorage.removeItem('token_estudiante');

    this.mensajeExito = 'Sesion cerrada correctamente';


    setTimeout(() =>{

      this.router.navigate(['/login-estudiante']);

    },1400)

  }

  obtenerIdCurso(id_curso:number):void{

    if(id_curso){

      this.router.navigate(['/info-curso',id_curso])

    }
  }

  rutaActualizarDatos():void{

    this.router.navigate(['/editar-perfil-alumno'])

  }

  rutaActualizarPassword():void{

    this.router.navigate(['/editar-password-alumno'])


  }


 






}
