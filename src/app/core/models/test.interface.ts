export interface Test {
    id_test:   number;
    nombre:    string;
    enfoque:   string;
    questions: Question[];
    answers:   Answers;
}

export interface Answers {
    "1": Type1[];
}

export interface Type1 {
    id_respuesta:    number;
    opcion:          string;
    puntos:          number;
    tipo_respuestas: number;
    url_imagen:      string;
}

export interface Question {
    id_pregunta:     number;
    nombre:          string;
    descripcion:     null | string;
    puntos:          null;
    id_test:         number;
    tipo_respuestas: number;
    ulr_imagen:      string;
}