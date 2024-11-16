import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaModel } from '../../models/tarea/tarea.model';
import { CreateTareaModel } from '../../models/tarea/createtarea.model';
import { UpdateTareaModel } from '../../models/tarea/updatetareamodel';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://localhost:44396/api/Tarea';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaModel[]> {
    return this.http.get<TareaModel[]>(this.apiUrl);
  }

  createTareas(tarea: CreateTareaModel): Observable<TareaModel> {
    return this.http.post<TareaModel>(this.apiUrl, tarea);
  }


  updateTareas(id: number, tarea: UpdateTareaModel): Observable <TareaModel> {
    return this.http.put<TareaModel>(`${this.apiUrl}/${id}`, tarea);
  }

  
  deleteTarea (id : number) : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  finishTarea(id : number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ToggleStatus/${id}`,{});
  }
}
