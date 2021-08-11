export interface Historial {
    id_historial: number;
    id_test:      number;
    id_paciente:  number;
    id_admin:     number;
    f_asignacion: Date;
    puntaje?: number;
    f_fin?: Date;
}