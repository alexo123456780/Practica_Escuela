import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';



@Component({
  selector: 'app-registro-estudiante',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})


export class RegistroEstudianteComponent {

  estaCargando: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  mostrarPassword: boolean = false;
  imagenPrevisualizacion : string | ArrayBuffer | null = null;
  imagenArchivo: File |  null = null;
  formularioAlumno: FormGroup;


  constructor(private estudianteService:EstudianteServiceService, private fb:FormBuilder, private router:Router){

    this.formularioAlumno = this.fb.group({

      nombre_estudiante: ['',Validators.required],
      apellido: ['',Validators.required],
      matricula: ['',[Validators.required,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    })


  }


  mostrarPasswordOcultar():void{

    this.mostrarPassword = !this.mostrarPassword;

  }

  subirtuImagen(event: Event):void{

    const archivo = (event.target as HTMLInputElement).files?.[0] 


    if(archivo){

      this.imagenArchivo = archivo;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagenPrevisualizacion = reader.result;

      }

      
      reader.readAsDataURL(archivo);

    }

  }


  enviarRegistro():void{


    if(this.formularioAlumno.valid && this.imagenArchivo ){

      this.estaCargando = true;

      const formData = new FormData();

      formData.append('nombre_estudiante',this.formularioAlumno.get('nombre_estudiante')?.value);
      formData.append('apellido',this.formularioAlumno.get('apellido')?.value);
      formData.append('matricula',this.formularioAlumno.get('matricula')?.value);
      formData.append('password',this.formularioAlumno.get('password')?.value);
      formData.append('perfil_estudiante',this.imagenArchivo);


      this.estudianteService.registroEstudiante(formData).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Registro exitoso del estudiante';

          console.log('Respuesta de la api: ',response.message);

          setTimeout(() =>{

            this.router.navigate(['/login-estudiante']);


          },1400)

        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error al registrar el estudiante';

          console.log('Respuesta de la api:',JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';


          },1400)

        }






      })








    }else{

      this.mensajeError = 'Error al encontrar la imagen o formulario corrupto';

    }
  }















}
