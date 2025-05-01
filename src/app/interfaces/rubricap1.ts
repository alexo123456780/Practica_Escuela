export interface RubricaP1
{
    id:number,
    maetro_id:number,
    estudiante_id:number
    calificacion_id:number,
    calificacion_tareas:number,
    calificacion_examen: number,
    asistencia:number,
    calificacion_final:number,
    created_at:string,
    updated_at: string
}


export interface RubricaP1Response{

    status:boolean,
    message:string,
    data:RubricaP1,
    code:number
}



export interface RubricaP1Calificar
{
    estudiante_id: number,
    calificacion_id:number,
    calificacion_tareas:number,
    calificacion_examen: number,
    asistencia: number
}






