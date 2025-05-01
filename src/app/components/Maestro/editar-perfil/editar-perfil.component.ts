import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MaestroServiceService } from '../../../services/maestro-service.service';

@Component({
  selector: 'app-editar-perfil',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})


export class EditarPerfilComponent implements OnInit{

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarModal: boolean = false;
  formularioEditar:FormGroup;
  imagenPrevisualizacion : string | ArrayBuffer | null = null;
  imagensubida: File | null = null;
  id_maestro: number = 0;

  constructor(private fb:FormBuilder, private maestroService:MaestroServiceService, private router:Router){

    this.formularioEditar = this.fb.group({

      nombre_maestro: [''],
      apellido:[''],
      numero_telefono:['',Validators.maxLength(10)],
    })
  }


  ngOnInit(): void {
    this.obtenerIdMaestro();
    
  }

  obtenerIdMaestro():void{

    const infoMaestro = localStorage.getItem('maestro');

    if(infoMaestro){

      const infoDetallado = JSON.parse(infoMaestro);


      if(infoDetallado && typeof infoDetallado.id === 'number'){

        this.id_maestro = infoDetallado.id;

        console.log('Id del maestro:',this.id_maestro);

      }
    }

  }

  obtenerImagen(event : Event):void{

    const archivoSeleccionado = (event.target as HTMLInputElement).files?.[0];


    if(archivoSeleccionado){

      this.imagensubida = archivoSeleccionado;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagenPrevisualizacion = reader.result;


      }

      reader.readAsDataURL(archivoSeleccionado);
    }

  
  }


  cambiarPerfil():void{

    if(this.formularioEditar.valid && this.imagensubida){

      this.estaCargando = true;

      const formData = new FormData();


      /*dato valioso que servira toda la vida el metodo form data solo se envia por medio de post
      entonces en laravel de afuerzas uso put para actualizar y para consumir algo en angular
      tengo que usar post si o si para enviar los datos en formdata  y ya al momento de consumir pues solo especicicias con 

      formData.append('_method','PUT') para que sepa que va actualizar pero los datos se evnvian usando post si no no jala y se sufre un montonn xdxd

      */

      formData.append('_method','PUT');
      formData.append('nombre_maestro',this.formularioEditar.get('nombre_maestro')?.value);
      formData.append('apellido',this.formularioEditar.get('apellido')?.value)
      formData.append('numero_telefono',this.formularioEditar.get('numero_telefono')?.value);
      formData.append('perfil_maestro',this.imagensubida)


      this.maestroService.actualizarDatosMaestro(this.id_maestro,formData).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          this.mensajeExito = 'Datos del maestro cambiado correctamente inicie sesion nuevamente para ver los cambios';

          console.log('Datos del maestro actualizados correctamente',response.data);


          setTimeout(() =>{

            this.router.navigate(['/dashboard-maestro']);

          },1400)

        },

        error:(error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error al actualizar tus datos, verifica que tus datos esten bien',

          console.log('Error detallado',JSON.stringify(error,null,2));


          setTimeout(() =>{

            this.mensajeError = '';


          },1400)
        }
      })
    }

  }


  mostrarModalMaestro():void{

    if(this.formularioEditar.valid && this.imagensubida){

      this.mostrarModal = true;

    }else{

      this.mensajeError = 'Complete todos los campos requeridos';

      setTimeout(() =>{

        this.mensajeError = '';


      },1400)


    }

  }

  aceptarModal():void{

    this.mostrarModal = false;

    this.cambiarPerfil();

  }


  rutaDashboard():void{
    this.router.navigate(['/dashboard-maestro']);
  }


  
















}
