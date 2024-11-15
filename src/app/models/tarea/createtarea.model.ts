import { UserModel } from "../user/user.model";

export interface CreateTareaModel {
    tarea: string;
    descripcion: string;
    idUsuario: number;
}