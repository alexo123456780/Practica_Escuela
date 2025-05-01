export interface Maestro
{
    id:number,
    nombre_maestro:string,
    apellido:string,
    matricula:string,
    numero_telefono:string,
    password:string,
    perfil_maestro:string,
    curso_id:number,
    created_at:string,
    updated_at:string

}

export interface MaestroResponse
{
    status:boolean,
    message:string,
    data:Maestro,
    token:string,
    code:number

}

export interface MaestroListaResponse
{
    status:boolean,
    message:string,
    data:Maestro[],
    code:number

}

export interface MaestroCredenciales
{
    matricula:string,
    password:string

}

export interface MaestroRegistro{
    nombre_maestro:string,
    apellido: string,
    matricula: string,
    numero_telefono: string,
    password: string,
    perfil_maestro: string

}


export interface MaestroPassword
{
    password:string
}