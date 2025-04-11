import { Component } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { NotaDto } from '../../interfaces/nota-dto';

@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  notas: NotaDto[] = []
  constructor(private servicio: NotaService) {
    this.obtenerNotas()
  }
  obtenerNotas() {
    this.servicio.obtenerTodos().subscribe({
      next: (notas) => { 
        this.notas = notas
      }
    })
  }
}
