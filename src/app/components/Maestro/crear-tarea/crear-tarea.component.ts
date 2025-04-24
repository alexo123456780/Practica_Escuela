import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TareaServiceService } from '../../../services/tarea-service.service';
import { TareaRequestCreacion } from '../../../interfaces/tarea';


@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})


export class CrearTareaComponent  implements OnInit{

  estaCargando:boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  id_maestro: number = 1;
  formularioTarea: FormGroup;
  fecha_minima: string = '';
  mostrarModal: boolean = false;

  constructor(private tareaService:TareaServiceService, private fb:FormBuilder, private router:Router){

    this.formularioTarea = this.fb.group({

      titulo_tarea: ['',Validators.required],
      instrucciones: ['',Validators.required],
      fecha_vencimiento: ['',Validators.required]

    })


  }


  ngOnInit(): void {

    this.obtenerIdMaestro();

    const fechahoy= new Date();

    this.fecha_minima = fechahoy.toISOString().split('T')[0];
    
  }

  obtenerIdMaestro():void{

    const infoMaestro = localStorage.getItem('maestro');

    if(infoMaestro){

      const informacionPersonal = JSON.parse(infoMaestro);

      if(informacionPersonal  && typeof informacionPersonal.id === 'number'){

        this.id_maestro = informacionPersonal.id;

        console.log('Id obtenido correctamente',this.id_maestro);

      }

    }else{

      console.log('No se encontro informacion del maestro verifique que haya iniciado sesion');

    }
  
  }


  
  crearTarea():void{

    const datos: TareaRequestCreacion = {...this.formularioTarea.value};

    if(this.formularioTarea.valid){

      this.estaCargando = true;

      this.tareaService.crearTareaMaestro(this.id_maestro,datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Tarea creada exitosamente';

          setTimeout(() =>{

            this.mensajeExito = '';
          },1400)

          console.log('Respuesta de la api:',JSON.stringify(response.data,null,2));


        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error en los campos solicitados intentelo de nuevo porfavor';

          console.log('Error detallado',JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';
          },1400)


        } 

      })

    }
  }




  abrirModal():void{

    if(this.formularioTarea.valid){

      this.mostrarModal = true;

    }else{

      this.mensajeError = 'Completa todos los campos';

      setTimeout(() =>{

        this.mensajeError = '';


      },1400)

    }
  }

  confirmarCreacion():void{

    this.mostrarModal = false;
    this.crearTarea();

  }




}
