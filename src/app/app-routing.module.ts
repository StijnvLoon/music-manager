import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SetupComponent } from './components/setup/setup.component';

const routes: Routes = [
    { path: 'lobby', component: LobbyComponent },
    { path: 'setup', component: SetupComponent },
    { path: '**', redirectTo: 'lobby', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
