import { Component } from '@angular/core';
import { NotaService } from '../../services/nota.service';
import { NotaDto } from '../../interfaces/nota-dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ListaComponent {
  displayColumns: string[] = [
    'tags',
    'valor01',
    'valor02',
    'valor03',
    'valor04',
    'acciones',
  ];
  notas: NotaDto[] = [];
  estaCargando = false;
  dataSource = new MatTableDataSource(this.notas);

  constructor(private servicio: NotaService) {
    this.obtenerNotas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerNotas() {
    this.estaCargando = true;
    this.servicio.obtenerTodos().subscribe({
      next: (notas) => {
        this.notas = notas;
        this.dataSource = new MatTableDataSource(this.notas);
        this.estaCargando = false;
      },
      error: (error) => {
        console.log(error);
        this.estaCargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Valio pepino',
          timer: 3000,
        });
      },
    });
  }

  copiarEnPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Copiado al portapapeles',
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  }
}
