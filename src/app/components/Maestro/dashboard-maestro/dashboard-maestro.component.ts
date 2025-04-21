import { Component , type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CursoServiceService } from '../../../services/curso-service.service';
import { MaestroServiceService } from '../../../services/maestro-service.service';
import { Maestro } from '../../../interfaces/maestro';
import { Curso } from '../../../interfaces/curso';


@Component({
  selector: 'app-dashboard-maestro',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard-maestro.component.html',
  styleUrls: ['./dashboard-maestro.component.css']
})
export class DashboardMaestroComponent implements OnInit {

  mensajeError: string = '';
  mensajeExito: string = '';
  id_maestro: number = 1;
  id_curso: number = 1;
  infoMaestro: Maestro | null = null;
  infoCurso: Curso | null = null;



  constructor(private cursoService:CursoServiceService, private maestroService:MaestroServiceService, private router:Router){}

  ngOnInit(): void {

    this.obtenerIdMaestroyCurso();
    this.obtenerInfoMaestro();
    this.obtenerInfoCurso();
    
  }


  obtenerIdMaestroyCurso():void{

    const maestroInfo = localStorage.getItem('maestro');

    if(maestroInfo){

      const maestroInformacionpersonal = JSON.parse(maestroInfo);

      if(maestroInformacionpersonal && typeof maestroInformacionpersonal.id === 'number' && typeof maestroInformacionpersonal.curso_id === 'number'){

        this.id_maestro = maestroInformacionpersonal.id;
        this.id_curso = maestroInformacionpersonal.curso_id;

        console.log('Datos obtenidos correctamente',JSON.stringify({

          id_maestro: maestroInformacionpersonal.id,
          id_curso: maestroInformacionpersonal.curso_id


        },null,2));
        

      }else{

        console.log('Error al buscar la informacion del maestro');


      }

    }
  }

  obtenerInfoMaestro():void{

    this.maestroService.obtenerInfoMaestro(this.id_maestro).subscribe({

      next: (response) =>{

        console.log('Informacion del maestro obtenida correctamente',JSON.stringify(response.data,null,2));

        this.infoMaestro = response.data;

        console.log('Hola::',this.infoMaestro);


      },
      error: (error) =>{

        this.mensajeError = 'Error al encontrar info del maestro';

        console.log('Ocurrio un error al traer los datos del maestro',JSON.stringify(error,null,2));

        setTimeout(() =>{

          this.mensajeError = '';


        },1400)

      }
    })

  }


  obtenerInfoCurso():void{

    this.cursoService.obtenerInfoCurso(this.id_curso).subscribe({

      


     
    })






  }











}
