import { Routes } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { EditarComponent } from './components/editar/editar.component';
import { AgregarComponent } from './components/agregar/agregar.component';

export const routes: Routes = [
    {path:"", component: ListaComponent},
    {path:"editar/:id", component: EditarComponent},
    {path: "agregar", component: AgregarComponent}
];
