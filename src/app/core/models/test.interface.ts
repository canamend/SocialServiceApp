export interface Test {
    id_test:   number;
    nombre:    string;
    keyword:    string;
    enfoque:   string;
    questions: Question[];
    answers?:   { [key: string]: Answer[] };
}

export interface Answer {
    id_respuesta:    number;
    opcion:          string;
    puntos:          number;
    tipo_respuestas: number;
    url_imagen:      string;
}

export interface Question {
    id_pregunta?:     number;
    nombre:          string;
    descripcion:     null | string;
    id_test:         number;
    tipo_respuestas: number;
    url_imagen:      string;
    tipo_pregunta?:  string;
    factor?:         string;
}

export interface TestInfo {
    id_test?:   number;
    nombre:    string;
    enfoque:   string;
    keyword:    string;
}
