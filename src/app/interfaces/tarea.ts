export interface Tarea
{
    id:number,
    titulo_tarea:string,
    instrucciones:string,
    fecha_vencimiento:string,
    status:boolean,
    curso_id:number,
    maestro_id:number,
    created_at:string,
    updated_at:string

}

export interface TareaResponse
{
    status:boolean,
    message:string,
    data:Tarea,
    code:number
}

export interface TareaListaResponse
{
    status:boolean,
    message:string,
    data:Tarea[],
    code:number

}

export interface TareaRequestCreacion
{
    titulo_tarea:string,
    instrucciones:string,
    fecha_vencimiento:string,

}

