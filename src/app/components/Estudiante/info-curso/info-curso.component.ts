import { Component,type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CursoServiceService } from '../../../services/curso-service.service';
import { TareaServiceService } from '../../../services/tarea-service.service';
import { Curso } from '../../../interfaces/curso';
import { Tarea } from '../../../interfaces/tarea';

@Component({
  selector: 'app-info-curso',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './info-curso.component.html',
  styleUrls: ['./info-curso.component.css']
})
export class InfoCursoComponent implements OnInit{

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  curso: Curso | null = null;
  id_curso: number | null = null;
  tareas_curso : Tarea[] = [];
  id_tarea: number | null = null;
  imagen_preview : string | ArrayBuffer | null = null;
  archivo: File | null = null;
  fecha_entrega: string = '';
  id_estudiante: number | null = null;


  constructor(private cursoService:CursoServiceService, private router:Router, private route:ActivatedRoute,private tareaService: TareaServiceService){
  }


  ngOnInit(): void {

    this.route.params.subscribe(params =>{

      this.id_curso = +params['id'];
      this.obetenerTareasCurso();
    })

    this.obtenerIdEstudiante();

    
  }

  limpiarFiltro():void{

    if(this.mensajeExito){

      setTimeout(() =>{

        this.mensajeExito = '';

      },1400)

    }
    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)
    }

  }

  obtenerIdEstudiante():void{

    this.id_estudiante = this.tareaService.obtenerIdEstudiante();
    console.log('Id del estudiante',this.id_estudiante);

  }



  obetenerTareasCurso():void{

    if(this.id_curso){

      this.estaCargando = true;

      this.cursoService.obetenerTareasCurso(this.id_curso).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Tareas obtenidas correctamente';

          this.curso = response.data;

          this.tareas_curso = [...this.curso.tareas]

          if(this.tareas_curso.length === 0){

            this.mensajeExito = 'Aun no hay tareas asignadas para este curso';
            this.limpiarFiltro();

          }

          this.limpiarFiltro();



        },

        error: (error) =>{

          this.estaCargando = false;

          this.mensajeError = 'Ocurrio un error al cargar las tareas del curso';

          console.log(error);

          this.limpiarFiltro();
        }


      });

    }
  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard-estudiante']);


  }

  obtenerIdTarea(id_tarea:number):void{

    this.id_tarea = id_tarea;
  }

  recibirArchivo(event: Event):void{

    const archivo1  = (event.target as HTMLInputElement).files?.[0];

    if(archivo1){

      this.archivo = archivo1;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagen_preview = reader.result;

      }


      reader.readAsDataURL(archivo1);


    }

  }


  enviarTarea():void{

    if(this.id_tarea && this.archivo && this.id_estudiante){

      this.estaCargando = true;

      //validar la fecha 

      const hoy = new Date();
      const manana = new Date(hoy)

      manana.setDate(hoy.getDate() + 1);

      const fecha = manana.toISOString().split('T')[0];

      const formdata = new FormData();

      formdata.append('tarea_id',this.id_tarea.toString());
      formdata.append('archivos',this.archivo);
      formdata.append('fecha_entregada',fecha);


      this.tareaService.entregarTarea(this.id_estudiante,formdata).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          this.mensajeExito = 'Tarea entregada correctamente';

          console.log('Respuesta de la api:',JSON.stringify(response.message,null,2))

          this.limpiarFiltro();


        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'No puedes entrsgar una tarea que ya fue entregada';

          console.log(error,null,2);

          this.limpiarFiltro();


        }

      })

    }
  }


























    










}
