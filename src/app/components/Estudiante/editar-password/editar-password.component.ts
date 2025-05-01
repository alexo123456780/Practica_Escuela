import { Component,type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { EstudiantePassword } from '../../../interfaces/estudiante';
import { TareaServiceService } from '../../../services/tarea-service.service';

@Component({
  selector: 'app-editar-password',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './editar-password.component.html',
  styleUrls: ['./editar-password.component.css']
})
export class EditarPasswordComponent implements OnInit {

  estaCargando:boolean = false;
  mensajeError: string = '';
  mensajeExito:string = '';
  id_estudiante:number | null = null;
  ocultarPassword: boolean = false;
  formulario_password: FormGroup;
  mostrarModal: boolean = false;


  constructor(private estudianteService:EstudianteServiceService,private tareaService:TareaServiceService,private fb:FormBuilder, private router:Router){

    this.formulario_password = this.fb.group({

      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      password2: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]
    })

  }

  ngOnInit(): void {
    this.obteneridEstudiante();
    
  }

  obteneridEstudiante():void{
    this.id_estudiante = this.tareaService.obtenerIdEstudiante();
  }

  limpiarFiltros():void{

    if(this.mensajeError){

      setTimeout(() =>{
        this.mensajeError = '';

      },1300)

    }

    if(this.mensajeExito){

      setTimeout(() =>{
        this.mensajeExito = '';

      },1300)
    }
  }


  validarPassword():boolean{

    const password = this.formulario_password.get('password')?.value;
    const password2 = this.formulario_password.get('password2')?.value;

    if(password !== password2){

      this.mensajeError = 'El password no coincide intentelo de nuevo porfavor';

      this.limpiarFiltros();

      return false;

    }

    return true;

  }

  mostrarPassword():void{
    this.ocultarPassword = !this.ocultarPassword;
  }


  enviarPassword():void{

    const password1 = this.formulario_password.get('password')?.value;

    const password : EstudiantePassword = {password:password1};

    if(this.formulario_password.valid && this.id_estudiante){

      this.estaCargando = true;

      if(!this.validarPassword()){

        this.estaCargando = false;
        return;
      }

      this.estudianteService.actualizarPassword(this.id_estudiante,password).subscribe({
        
        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Password actualizado correctamente';

          this.formulario_password.reset();

          console.log('Respuesta:',response.message);

          this.limpiarFiltros();

        },

        error: (error) =>{

          this.estaCargando = false;

          if(error.error?.message){

            this.mensajeError = error.error?.message;

            this.limpiarFiltros();

          }else{

            this.mensajeError = 'Error interno del servicio';
            this.limpiarFiltros();


          }




        }
      })
    }
  }

  alertaModal():void{

    if(this.formulario_password.valid && this.id_estudiante){

      this.mostrarModal = true;

    }else{

      this.mensajeError = 'Complete todos los campos solicitados';
      this.limpiarFiltros();
      this.mostrarModal= false;
    }

  }

  confirmarModal():void{

    this.mostrarModal = false;
    this.enviarPassword();


  }



























}
