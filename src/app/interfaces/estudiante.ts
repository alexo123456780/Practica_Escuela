export interface Estudiante
{
    id:number,
    nombre_estudiante:string,
    apellido:string,
    matricula:string,
    password:string,
    perfil_estudiante:string,
    created_at:string,
    updated_at:string


}


export interface EstudianteResponse
{
    status:boolean,
    message:string,
    data:Estudiante,
    token:string,
    code:number

}

export interface EstudianteListaResponse
{
    status:boolean,
    message:string,
    data:Estudiante[],
    code:number


}

export interface EstudianteCredenciales
{
    matricula:string,
    password:string,
}