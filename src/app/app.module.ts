import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import { PokemonViewComponent } from './pokemon/pokemon-view/pokemon-view.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { FormsModule } from '@angular/forms';
import { TeamAddComponent } from './team/team-add/team-add.component';
import { TeamSelectComponent } from './battle/team-select/team-select.component';
import { FightRoundsComponent } from './battle/fight-rounds/fight-rounds.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonEditComponent,
    PokemonViewComponent,
    TeamListComponent,
    TeamDetailsComponent,
    TeamAddComponent,
    TeamSelectComponent,
    FightRoundsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
