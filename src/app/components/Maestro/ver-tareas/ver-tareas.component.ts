import { Component ,type OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TareaServiceService } from '../../../services/tarea-service.service';
import { Tarea } from '../../../interfaces/tarea';

@Component({
  selector: 'app-ver-tareas',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './ver-tareas.component.html',
  styleUrls: ['./ver-tareas.component.css']
})


export class VerTareasComponent  implements OnInit{

  estaCargando:boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  tareas: Tarea[] = [];
  id_curso: number | null = null;


  constructor(private tareaService:TareaServiceService, private router:Router){}

  ngOnInit(): void {

    this.obetenerIdCurso();
  }


  obetenerIdCurso():number | null{

    const infoMaestro = localStorage.getItem('maestro');

    if(infoMaestro){

      const infoDetalladoMaestro = JSON.parse(infoMaestro);

      if(infoDetalladoMaestro && typeof infoDetalladoMaestro.curso_id === 'number'){

        this.id_curso = infoDetalladoMaestro.curso_id;

        this.obetenerTareasCurso();

        return Number(this.id_curso);

      }
      else{

        this.mensajeError = 'No se encontro un id del curso del maestro';

        setTimeout(() =>{
          this.mensajeError = '';

        },1400
      )


      }

    }

    return null;
  }


  obetenerTareasCurso():void{

    if(this.id_curso){

      this.estaCargando = true;

      this.tareaService.obtenerTareasdelCurso(this.id_curso).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          if(response.data.length === 0){

            this.mensajeExito = 'Aun no hay tareas asignadas para este curso'

            setTimeout(() =>{

              this.mensajeExito = '';

            },1400)

          }

          this.mensajeExito = 'Tareas del curso obtenidas correctamente';

          this.tareas =  [...response.data];

          console.log(this.tareas);

          setTimeout(() =>{

            this.mensajeExito = '';
          },1400)
        
        },

        error:(error) =>{
          this.estaCargando = false;

          this.mensajeError = 'Error al cargar las tareas del curso';

          console.log('Error',error);

          setTimeout(() =>{

            this.mensajeError = '';

          },1400)


        }
      })

    }

  }


  rutaCreartareas():void{

    this.router.navigate(['/crear-tarea'])

  }






}
