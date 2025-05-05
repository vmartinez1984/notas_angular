import { Component, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from '../editar/editar.component';

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
    MatInputModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ListaComponent {
  editar(nota: any) {
    const dialogRef = this._dialog.open(EditarComponent, { data: nota,  })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }
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
  dataSource = new MatTableDataSource(this.notas)
  private _snackBar = inject(MatSnackBar)
  readonly _dialog = inject(MatDialog);

  constructor(private servicio: NotaService) {
    this.obtenerNotas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filter)
    //console.log(this.dataSource.filteredData);
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
    navigator.clipboard.writeText(texto)
    this._snackBar.open("Copiado, " + texto, "", { duration: 3000 })
  }
}
