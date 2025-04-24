import { Routes } from '@angular/router';
import { LoginMaestroComponent } from './components/Maestro/login-maestro/login-maestro.component';
import { LoginEstudianteComponent } from './components/Estudiante/login-estudiante/login-estudiante.component';
import { RegistroMaestroComponent } from './components/Maestro/registro-maestro/registro-maestro.component';
import { RegistroEstudianteComponent } from './components/Estudiante/registro-estudiante/registro-estudiante.component';
import { DashboardMaestroComponent } from './components/Maestro/dashboard-maestro/dashboard-maestro.component';
import { MaestroGuard } from './guards/maestroGuard';
import { CrearTareaComponent } from './components/Maestro/crear-tarea/crear-tarea.component';
import { EditarPerfilComponent } from './components/Maestro/editar-perfil/editar-perfil.component';




export const routes: Routes = 
[
    {path:'',redirectTo:'/login-maestro',pathMatch:'full'},


    {path:'login-maestro',component:LoginMaestroComponent},
    {path:'registro-maestro',component:RegistroMaestroComponent},
    {path:'dashboard-maestro',component:DashboardMaestroComponent,canActivate:[MaestroGuard]},
    {path:'crear-tarea',component:CrearTareaComponent},
    {path:'editar-perfil',component:EditarPerfilComponent},

    

    {path:'login-estudiante',component:LoginEstudianteComponent},
    {path:'registro-estudiante',component: RegistroEstudianteComponent}
    

];
