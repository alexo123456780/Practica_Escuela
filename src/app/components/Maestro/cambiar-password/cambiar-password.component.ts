import { Component,type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MaestroServiceService } from '../../../services/maestro-service.service';
import { MaestroPassword } from '../../../interfaces/maestro';

@Component({
  selector: 'app-cambiar-password',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit{

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  ocultarPassword: boolean = false;
  mostrarModal: boolean = false;
  formularioPassword: FormGroup;
  id_maestro: number | null = null;


  constructor(private maestroService:MaestroServiceService, private fb:FormBuilder, private router:Router){

    this.formularioPassword = this.fb.group({

      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      confirmarPassword: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]

    })
  }


  ngOnInit(): void {

    this.obtenerIdMaestro();
    
  }

  obtenerIdMaestro():number | null{

    const datoslocalesMaestro = localStorage.getItem('maestro');

    if(datoslocalesMaestro){

      const datos = JSON.parse(datoslocalesMaestro);

      if(datos && typeof datos.id === 'number'){

        this.id_maestro = datos.id;

        console.log('Id del maestro numero:',this.id_maestro);

        return Number(this.id_maestro);


      }else{

        console.log('No se encontro informacion del  maestro en el localStorage');
      }
    }


    return null;
  }


  validarPasswordFull():boolean{

    const password1 = this.formularioPassword.get('password')?.value;
    const password2 = this.formularioPassword.get('confirmarPassword')?.value;


    if(password1 !== password2){

      this.mensajeError = 'Error las contrasenas no coinciden intententelo de nuevo porfavor'

      setTimeout(() =>{

        this.mensajeError = '';
      },1400)

      return false

    }
    return true;
  }





  mostraroNoPassword():void{

    this.ocultarPassword = !this.ocultarPassword;

  }






  enviarPasswordNuevo():void{

    const passwordFormulario = this.formularioPassword.get('password')?.value;

    const password : MaestroPassword = {password:passwordFormulario};



    if(this.formularioPassword.valid && this.id_maestro){

      this.estaCargando = true;

      if(!this.validarPasswordFull()){

        this.estaCargando = false
        return;

      }

      this.maestroService.actualizarPasswordMaestro(this.id_maestro,password).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Password actualizado correctamente';

          console.log('Datos nuevos del maestro: ',response.data);

          setTimeout(() =>{

            this.mensajeExito = '';

          },1400)


        },

        error: (error) =>{

          this.estaCargando = false;

          if(error.code === 400){

            this.mensajeError = 'No puedes ingresar el mismo password que ya tenias ingresa un nuevo password porfavor';

            console.log('Error',JSON.stringify(error.code,null,2));

          }

          if(error.code === 500){

            this.mensajeError = 'Lo sentimos hemos tenido problemas del servidor intentelo mas tarde';

            console.log('Error del servidor',JSON.stringify(error.code,null,2));

          }

        }
      })
    }

  }



  mostrarelModalmasGood():void{

    if(this.formularioPassword.valid && this.id_maestro){

      this.mostrarModal = true;

    }else{

      this.mensajeError = 'Complete todos los campos del formulario porfas';

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)

      this.mostrarModal = false;


    }

  }

  confirmarModal():void{

     this.mostrarModal = false;
     this.enviarPasswordNuevo();

  }

}
