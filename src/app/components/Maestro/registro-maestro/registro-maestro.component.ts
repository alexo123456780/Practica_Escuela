import { Component,type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MaestroServiceService } from '../../../services/maestro-service.service';
import { CursoServiceService } from '../../../services/curso-service.service';
import { Curso } from '../../../interfaces/curso';



@Component({
  selector: 'app-registro-maestro',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './registro-maestro.component.html',
  styleUrls: ['./registro-maestro.component.css']
})
export class RegistroMaestroComponent implements OnInit {

  estaCargando:boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  formularioRegistro: FormGroup;
  ocultarPassword: boolean = false;
  previewImagen: string | ArrayBuffer | null = null;
  imagenArchivo: File | null = null;
  cursos: Curso[] = [];



constructor(private maestroService:MaestroServiceService, private fb:FormBuilder, private router:Router,private cursoService:CursoServiceService){

  this.formularioRegistro = this.fb.group({

    nombre_maestro: ['',Validators.required],
    apellido: ['',Validators.required],
    matricula: ['',[Validators.required,Validators.minLength(8)]],
    numero_telefono: ['',[Validators.required,Validators.maxLength(10)]],
    password: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(20)]],
    curso_id:['',Validators.required]
    
    
  })


}

  ngOnInit(): void {

    this.obtenerCursos();
  
    
  }

  obtenerCursos():void{

    this.cursoService.obtenerCursos().subscribe({

      next: (response) =>{

        console.log('Cursos obtenidos correctamente',response.data);

        this.cursos = response.data;

      },

      error: (error) => {

        console.log('Error al obtener los cursos:',JSON.stringify(error,null,2));
      }

    })


  }


  





  mostraryOcultarPassword():void{

    this.ocultarPassword = !this.ocultarPassword;
  }



  seleccionarArchivo(event: Event):void{

    const archivo = (event.target as HTMLInputElement).files?.[0];

    if(archivo){

      this.imagenArchivo = archivo;

      const reader = new FileReader();

      reader.onload = () =>{

        this.previewImagen = reader.result;

      }

      reader.readAsDataURL(archivo);

    }
  };


  registrarMaestro():void{

    if(this.formularioRegistro.valid && this.imagenArchivo){

      this.estaCargando = true;

      const formData = new FormData();

      formData.append('nombre_maestro', this.formularioRegistro.get('nombre_maestro')?.value);
      formData.append('apellido', this.formularioRegistro.get('apellido')?.value);
      formData.append('matricula',this.formularioRegistro.get('matricula')?.value);
      formData.append('numero_telefono',this.formularioRegistro.get('numero_telefono')?.value);
      formData.append('password',this.formularioRegistro.get('password')?.value);
      formData.append('perfil_maestro',this.imagenArchivo);
      formData.append('curso_id',this.formularioRegistro.get('curso_id')?.value)



      this.maestroService.registroMaestro(formData).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Maestro registrado exitosamente';

          console.log('Respuesta de la api:',response.message);


          setTimeout(() =>{

            this.router.navigate(['/login-maestro']);


          },1400)

        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Ocurrio un error al registrarse intentelo de nuevo porfavor';

          console.log('Error detallado',JSON.stringify(error,null,2));

          setTimeout(() =>{

            this.mensajeError = '';

          },1400)


        }




      })
    }else{

      this.mensajeError = 'Complete todos los campos';

    }

  }





}
