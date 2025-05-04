import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormularioComponent } from "../formulario/formulario.component";
import { NotaDto } from '../../interfaces/nota-dto';

@Component({
  selector: 'app-editar',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    //MatDialogActions,
    //MatDialogClose,
    FormularioComponent],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  guardar(nota: NotaDto) {
    console.log()
  }
  nota?: NotaDto
  _estaCargando = false

  constructor(
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    //console.log(data)
    this.nota = data
  }

  ngOnChanges() {
    //console.log(this.nota)
  }
}
/// https://blog.angular-university.io/angular-material-dialog/