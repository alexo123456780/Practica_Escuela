export interface Calificacion
{
    id: number,
    maestro_id: number,
    estudiante_id:number,
    parcial_1: number,
    parcial2: number,
    parcial3: number
    promedio_final: number,
    created_at : string,
    updated_at: string
}

export interface CalificacionResponse
{
    status:boolean,
    message:string,
    data: Calificacion,
    code: number
}

export interface CalificacionListaResponse
{
    status:boolean,
    message:string,
    data:Calificacion[],
    code:number
}


















