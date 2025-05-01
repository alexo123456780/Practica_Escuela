import { Routes } from '@angular/router';
import { LoginMaestroComponent } from './components/Maestro/login-maestro/login-maestro.component';
import { LoginEstudianteComponent } from './components/Estudiante/login-estudiante/login-estudiante.component';
import { RegistroMaestroComponent } from './components/Maestro/registro-maestro/registro-maestro.component';
import { RegistroEstudianteComponent } from './components/Estudiante/registro-estudiante/registro-estudiante.component';
import { DashboardMaestroComponent } from './components/Maestro/dashboard-maestro/dashboard-maestro.component';
import { MaestroGuard } from './guards/maestroGuard';
import { CrearTareaComponent } from './components/Maestro/crear-tarea/crear-tarea.component';
import { EditarPerfilComponent } from './components/Maestro/editar-perfil/editar-perfil.component';
import { VerAlumnosComponent } from './components/Maestro/ver-alumnos/ver-alumnos.component';
import { VerTareasComponent } from './components/Maestro/ver-tareas/ver-tareas.component';
import { CambiarPasswordComponent } from './components/Maestro/cambiar-password/cambiar-password.component';
import { CalificarP1Component } from './components/Maestro/calificar-p1/calificar-p1.component';
import { estudianteGuard } from './guards/estudianteGuard';
import { EstudianteDashboardComponent } from './components/Estudiante/estudiante-dashboard/estudiante-dashboard.component';
import { InfoCursoComponent } from './components/Estudiante/info-curso/info-curso.component';
import { EditarPerfilAComponent } from './components/Estudiante/editar-perfil-a/editar-perfil-a.component';
import { VerEntregasComponent } from './components/Maestro/ver-entregas/ver-entregas.component';
import { EditarPasswordComponent } from './components/Estudiante/editar-password/editar-password.component';


export const routes: Routes = 
[
    {path:'',redirectTo:'/login-maestro',pathMatch:'full'},

    {path:'login-maestro',component:LoginMaestroComponent},
    {path:'registro-maestro',component:RegistroMaestroComponent},
    {path:'dashboard-maestro',component:DashboardMaestroComponent,canActivate:[MaestroGuard]},
    {path:'crear-tarea',component:CrearTareaComponent},
    {path:'editar-perfil',component:EditarPerfilComponent},
    {path:'ver-alumnos',component:VerAlumnosComponent},
    {path:'ver-tareasm',component:VerTareasComponent},
    {path:'actualizar-password',component:CambiarPasswordComponent},
    {path:'calificar-p1',component:CalificarP1Component},

    
    {path:'login-estudiante',component:LoginEstudianteComponent},
    {path:'registro-estudiante',component: RegistroEstudianteComponent},
    {path:'dashboard-estudiante',component:EstudianteDashboardComponent,canActivate:[estudianteGuard]},
    {path:'info-curso/:id',component:InfoCursoComponent},
    {path:'editar-perfil-alumno',component:EditarPerfilAComponent},
    {path:'ver-entregas-alumno',component:VerEntregasComponent},
    {path:'editar-password-alumno',component:EditarPasswordComponent}
    

];
