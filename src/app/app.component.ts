import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SesionService } from './services/sesion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private servicio: SesionService, private router: Router) {}

  cerrarSesion() {
    this.servicio.cerrarSesion();
    this.router.navigate(['/', 'inicioDeSesion']);
  }

  title = 'Notas';

  estaIniciadaLaSesion(): boolean {
    return this.servicio.estaIniciadaLaSesion();
  }
}
