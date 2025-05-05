import { Component, inject } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { NotaService } from '../../services/nota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar',
  imports: [FormularioComponent, RouterModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  private _snackBar = inject(MatSnackBar)
  _estaCargando: boolean = false

  constructor(private servicio: NotaService, private router: Router) { }

  guardar(nota: any) {
    console.log(nota)
    this._estaCargando = true
    this.servicio.agregar(nota).subscribe({
      next: (data) => {
        console.log(data)
        this._estaCargando = false
        this._snackBar.open("Datos registrados", "", { duration: 3000, data: data })
        this.router.navigate([''])
      },
      error: (data) => {
        console.log(data)
        this._snackBar.open("Valio pepino", "", { duration: 3000 })
        this._estaCargando = false;
      }
    })
  }
}
