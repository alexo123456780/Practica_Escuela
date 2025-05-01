import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EstudianteServiceService } from '../../../services/estudiante-service.service';
import { Estudiante } from '../../../interfaces/estudiante';

@Component({
  selector: 'app-ver-alumnos',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.css']
})


export class VerAlumnosComponent implements OnInit{

  estaCargando: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService:EstudianteServiceService, private router:Router){}

  ngOnInit(): void {
    this.obtenerEstudiantes();

  }


  obtenerEstudiantes():void{

    this.estudianteService.obtenerEstudiantes().subscribe({

      next: (response) => {

        if(response.data.length === 0){

          this.mensajeExito = 'No hay Estudiantes aun'
        }


        console.log('Estudiantes obtenidos correctamente');

        this.estudiantes = [...response.data];

        console.log('Estudiantes',this.estudiantes);

      },

      error: (error) =>{

        this.mensajeError = 'Ocurrio un error al traer los alumnos';

        console.log('Error detallado',JSON.stringify(error,null,2));

        setTimeout(() =>{

          this.mensajeError = '';


        },1400)

      }

    })



  }














}
