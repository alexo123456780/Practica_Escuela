import { Inject, inject } from "@angular/core";
import { Router } from "@angular/router";



export const estudianteGuard = () =>{


    const router = inject(Router);
    const token = localStorage.getItem('token_estudiante');


    if(!token){

        router.navigate(['/login-estudiante']);
        console.log('Necita logearse para acceder al dasboard');

        return false


    }

    return  true;




}






