import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SetupComponent } from './components/setup/setup.component';
import { PlayerComponent } from './components/player/player.component';
import { EditorComponent } from './components/editor/editor.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { ViewerComponent } from './components/viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    SetupComponent,
    PlayerComponent,
    EditorComponent,
    ExplorerComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
