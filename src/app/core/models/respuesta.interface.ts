export interface Respuesta {
    id_respuesta?:    number;
    opcion:          string;
    puntos:          number;
    tipo_respuestas?: number;
    url_imagen:      string;
}

export interface TipoRespuesta {
    tipo_respuesta: number;
    respuestas:     Respuesta[];
}