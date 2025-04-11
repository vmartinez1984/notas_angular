import { Component } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { NotaDto } from '../../interfaces/nota-dto';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
})
export class ListaComponent {
  displayColumns: string[] =['nombre','tags','contenido','estado','acciones']
  notas: NotaDto[] = []
  estaCargando = false

  constructor(private servicio: NotaService) {
    this.obtenerNotas()
  }
  obtenerNotas() {
    this.estaCargando = true
    this.servicio.obtenerTodos().subscribe({
      next: (notas) => { 
        this.notas = notas
        this.estaCargando = false
      },error:(error)=>{
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Valio pepino",   
          timer: 3000       
        });
      }
    })
  }

  copiarEnPortapapeles(texto:string){
    navigator.clipboard.writeText(texto);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Copiado al portapapeles",
      showConfirmButton: false,
      timer: 1000,
      toast: true
    });
  }
}

// export class Table{
//   displayColumns: string[] =['nombre', 'contenido','tags','estado','acciones']
//   dataSource = 
// }