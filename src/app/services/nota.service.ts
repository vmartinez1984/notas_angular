import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaDto } from '../interfaces/nota-dto';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  baseUrl = "http://localhost:8500/api/";
  url = this.baseUrl + "Notas/"
  constructor(private httpClient: HttpClient) {

  }

  obtenerTodos(): Observable<NotaDto[]> {
    return this.httpClient.get<NotaDto[]>(this.url)
  }

  agregar(nota: NotaDto): Observable<any> {
    return this.httpClient.post<any>(this.url, nota)
  }

  actualizar(id:string, nota: any):Observable<any>{
    return this.httpClient.put<any>(this.url+ id, nota)
  }
}
