import { TareaModel } from "../tarea/tarea.model";

export interface UserModel {
    idUsuario: number;
    nombre: string;
    usuario : string;
    contrasena : string;
    Tareas : TareaModel[];
}