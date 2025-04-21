import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { EstudianteCredenciales } from '../../../interfaces/estudiante';

@Component({
  selector: 'app-login-estudiante',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})


export class LoginEstudianteComponent {

  estaCargando: boolean = false;
  mostrarPassword: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  formularioLogin: FormGroup;


  constructor(private estudianteService:EstudianteServiceService, private fb:FormBuilder, private router:Router ){

    this.formularioLogin = this.fb.group({

      matricula: ['',[Validators.required,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]

    })

  }

  desenfundarPassword():void{

    this.mostrarPassword = !this.mostrarPassword;

  }




  logearte():void{

    const matricula1 = this.formularioLogin.get('matricula')?.value;
    const password1 = this.formularioLogin.get('password')?.value;

    const credenciales : EstudianteCredenciales = {matricula:matricula1, password:password1};

    if(this.formularioLogin.valid){

      this.estaCargando = true;

      this.estudianteService.loginEstudiante(credenciales).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Login exitoso estudiante...'

        
          if(response){
            console.log('Inicio de sesion exitosa: ',response.message);
            const token = response.token;

            if(token){

              localStorage.setItem('token_estudiante',token);
              console.log('Token guardado correctamente');


            }else{
              console.log('No se encontro token disponible');

            }

            if(response.data){

              console.log('Guardando los datos del estudiante...');

              localStorage.setItem('estudiante',JSON.stringify(response.data));

              console.log('Datos del estudiante',JSON.stringify({
                nombre: response.data.nombre_estudiante,
                apellido: response.data.apellido,
                matricula:response.data.matricula

              },null,2))

            }else{

              console.log('No se encontro informacion para guardar');

            }

          }else{
            this.mensajeError = 'Ocurrio un error..';
            console.log('Error al buscar una respuesta');
          }

          console.log('Navegando al menu del estudiante....');

          /*setTimeout(() =>{


          })*/
        },

        error: (error) =>{
          this.estaCargando = false;
          this.mensajeError = 'Credenciales invalidas intente de nuevo porfavor...'
          console.log('Respuesta del backend',JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';

          },1400)

        }
      })

    }else{

      this.mensajeError = 'Complete todos los campos del formulario';
      console.log('Error de formulario',this.formularioLogin.errors);

      setTimeout(() =>{

        this.mensajeError = '';


      },1400)


    }
  }
















}
