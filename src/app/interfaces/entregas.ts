import { Estudiante } from "./estudiante"

export interface Entrega
{
    id:number,
    alumno_id:number,
    tarea_id:number,
    archivos:string,
    calificacion:number,
    comentarios_profesor:string,
    fecha_entregada:string,
    created_at:string,
    updated_at:string,
    estudiante:Estudiante
}


export interface EntregaResponse{

    status:boolean,
    message:string,
    data:Entrega,
    code:number
}