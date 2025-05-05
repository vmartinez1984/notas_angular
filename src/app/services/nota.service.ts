import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaDto } from '../interfaces/nota-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  url = environment.api + 'Notas/';
  constructor(private httpClient: HttpClient) {}

  obtenerTodos(): Observable<NotaDto[]> {
    return this.httpClient.get<NotaDto[]>(this.url);
  }

  agregar(nota: NotaDto): Observable<any> {
    return this.httpClient.post<any>(this.url, nota);
  }

  actualizar(id: string, nota: any): Observable<any> {
    return this.httpClient.put<any>(this.url + id, nota);
  }
}
