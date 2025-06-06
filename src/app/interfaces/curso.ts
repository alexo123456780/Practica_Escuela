import { Maestro } from "./maestro"
import { Tarea } from "./tarea"

export interface Curso
{
    id:number,
    nombre_curso:string,
    descripcion_curso:string,
    imagen_curso:string,
    created_at:string,
    updated_at:string
    maestro: Maestro,
    tareas: Tarea[],

}

export interface CursoResponse
{
    status:boolean,
    message:string,
    data:Curso,
    code:number
}

export interface CursosListaResponse
{
    status:boolean,
    message:string,
    data:Curso[],
    code:number

}