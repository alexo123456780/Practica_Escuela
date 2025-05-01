import { Component,type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { TareaServiceService } from '../../../services/tarea-service.service';

@Component({
  selector: 'app-editar-perfil-a',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './editar-perfil-a.component.html',
  styleUrls: ['./editar-perfil-a.component.css']
})


export class EditarPerfilAComponent implements OnInit {

  estaCargando: boolean = false;
  mensajeExito:string = '';
  mensajeError: string = '';
  mostrarModal: boolean = false;
  id_estudiante: number | null = null;
  formulario_perfil: FormGroup;
  imagen_preview: string | ArrayBuffer | null = null;
  imagen_perfil: File | null = null;

  constructor(private estudianteService:EstudianteServiceService, private fb:FormBuilder, private router:Router, private tareaService:TareaServiceService){

    this.formulario_perfil = this.fb.group({
      
      nombre_estudiante: ['',Validators.maxLength(255)],
      apellido: ['',Validators.maxLength(255)]
    })

  }


  ngOnInit(): void {

    this.obtenerIdEstudiante();
    
  }


  obtenerIdEstudiante():void{
    this.id_estudiante = this.tareaService.obtenerIdEstudiante();
    console.log(this.id_estudiante);
  }


  obtenerImagendelPerfil(event:Event):void{

    const imagen_nueva = (event.target as HTMLInputElement).files?.[0];

    if(imagen_nueva){

      this.imagen_perfil = imagen_nueva;

      const reader = new FileReader();

      reader.onload  = () =>{

        this.imagen_preview = reader.result;

      }

      reader.readAsDataURL(imagen_nueva);
    }
  }

  limpiarFiltros():void{

    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)

    }

    if(this.mensajeExito){

      setTimeout(() =>{

        this.mensajeExito = '';

      },1400)

    }
  }




  enviarFormulario():void{

    if(this.id_estudiante){

      this.estaCargando = true;

      const datos = new FormData();

      datos.append('_method','PUT');

      const nombre = this.formulario_perfil.get('nombre_estudiante')?.value;
      const apellido =this.formulario_perfil.get('apellido')?.value;
      

      if(nombre){

        datos.append('nombre_estudiante',nombre);
      }

      if(apellido){
        datos.append('apellido',apellido);

      }

      if(this.imagen_perfil){

        datos.append('perfil_estudiante',this.imagen_perfil);
      }


      if(!this.imagen_perfil && !nombre && !apellido){
        this.estaCargando= false;
        this.mensajeError = 'Debes de mandar un dato minimo para actualizar';
        this.limpiarFiltros();
        return;
      }


      this.estudianteService.actualizarInfoEstudiante(this.id_estudiante,datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Se actualizo correctamente tus datos';

          console.log(response.message);

          this.limpiarFiltros();

        },

        error: (error) =>{
          this.estaCargando = false;
          this.mensajeError = 'Error de validacion en los campos verifica que tu informacion cumpla los campos establecidos';

          console.log('Error detallado',JSON.stringify(error,null,2));

          this.limpiarFiltros();
        }

      });

    }
  }


  alertaModal():void{

    if(this.id_estudiante){

      this.mostrarModal = true;

    }else{

      this.mostrarModal = false;
      this.mensajeError = 'Verifica que los datos sean correctos porfavor';

      this.limpiarFiltros();

    }


  }


  confirmarModal():void{

    this.mostrarModal = false;
    this.enviarFormulario();
  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard-estudiante']);


  }




}


