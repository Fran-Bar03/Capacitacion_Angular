import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserModel } from '../../models/user/createusuarios';
import { UpdateUserModel } from '../../models/user/updateusuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:44396/api/User';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }


  createUser( user : CreateUserModel ): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }


  updateUser (idUsuario : number ,user : UpdateUserModel) : Observable<UserModel>{
    return this.http.put<UserModel>(`${this.apiUrl}/${idUsuario}`,user);
  }


  deleteUser (idUsuario : number) : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idUsuario}`);
  }
  

}
