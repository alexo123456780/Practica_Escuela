import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MaestroServiceService } from '../../../services/maestro-service.service';
import { Maestro, MaestroCredenciales } from '../../../interfaces/maestro';
import { Curso } from '../../../interfaces/curso';

@Component({
  selector: 'app-login-maestro',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login-maestro.component.html',
  styleUrls: ['./login-maestro.component.css']
})

export class LoginMaestroComponent {

  estaCargando:boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  mostrarPassword: boolean = false;
  formularioMaestro: FormGroup;
 


  constructor(private maestroService:MaestroServiceService, private fb:FormBuilder, private router:Router){

    this.formularioMaestro = this.fb.group({

      matricula: ['', [Validators.required, Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(20)]]

    })


  }


  ocultaryMostrarPassword():void{

    this.mostrarPassword = !this.mostrarPassword;

  }

  login():void{

    const matriculaValidada = this.formularioMaestro.get('matricula')?.value;
    const passwordValidado = this.formularioMaestro.get('password')?.value;

    const credenciales : MaestroCredenciales = {matricula:matriculaValidada, password:passwordValidado}

    if(this.formularioMaestro.valid){

      this.estaCargando = true;

      this.maestroService.maestroLogin(credenciales).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Login exitoso';

          setTimeout(() =>{

            this.mensajeExito = '';


          },1400)



          if(response){

            if(response.token){

              const token = response.token;

              localStorage.setItem('token_maestro',token);

              console.log('Token guardado correctamente');

            }else{
              console.log('No se encontro un token disponible');
            }


            if(response.data){

              localStorage.setItem('maestro',JSON.stringify(response.data));

              console.log('Informacion del maestro guardada correctamente');

              console.log('Info de prueba:',JSON.stringify({
                nombre: response.data.nombre_maestro,
                apellido: response.data.apellido,
                matricula: response.data.matricula,
                perfil: response.data.perfil_maestro

              },null,2))

            }else{
              console.log('No se encontro informacion disponible...');
            }

          }else{

            console.log('No hubo informacion por parte de la api');

          }

          console.log('Login exitoso respuesta de la api:',JSON.stringify(response.message));


          setTimeout(() =>{

            this.router.navigate(['/dashboard-maestro'])


          },1400)


        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Credenciales invalidas intente de nuevo porfavor';

          console.log('respuesta de la api: ',JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';

          },1400)


        }

      })

    }else{

      this.mensajeError = 'Complete todos los campos porfavor';

      console.log('error:',this.formularioMaestro.errors);

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)


    }

  }

  obtenerInfoMaestro():void{



  }





















}
