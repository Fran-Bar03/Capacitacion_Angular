import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:44388/api/User';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }
}
