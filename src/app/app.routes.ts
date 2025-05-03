import { Routes } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { EditarComponent } from './components/editar/editar.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { InicioDeSesionComponent } from './components/inicio-de-sesion/inicio-de-sesion.component';
import { InicioDeSesionGuard } from './helpers/inicio-de-sesion';

export const routes: Routes = [
    { path: "inicioDeSesion", component: InicioDeSesionComponent },
    { path: "", component: ListaComponent, canActivate: [InicioDeSesionGuard] },
    { path: "editar/:id", component: EditarComponent, canActivate: [InicioDeSesionGuard] },
    { path: "agregar", component: AgregarComponent, canActivate: [InicioDeSesionGuard] },
];
