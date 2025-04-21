import { inject, Inject } from "@angular/core";
import { Router } from "@angular/router";


export const MaestroGuard = () =>{

    const router = inject(Router);
    const token = localStorage.getItem('token_maestro');


    if(!token){

        console.log('Se necita iniciar sesion antes...');

        router.navigate(['/login-maestro'])

        return false


    }

    return true;



}