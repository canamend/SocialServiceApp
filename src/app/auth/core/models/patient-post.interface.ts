export interface PatientPost {
    nombre: string;
    appaterno: string;
    apmaterno: string;
    genero: string;
    fnacimiento: string
    usuario?: string
    id_cuidador: number
    no_expediente: string;
}