interface User {
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    genero: string;
    f_nacimiento: string;
    usuario: string;
}

export interface dataPatient{
    nombre:string;
    id: number;
    username: string;
}

export interface Admin extends User{
    id_admin: number;
}

export interface Patient extends User{
    id_paciente: number;
    id_cuidador: number;
    no_expediente: string;
}
