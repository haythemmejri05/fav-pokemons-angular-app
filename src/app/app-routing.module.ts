import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './pokemon/pokemon-view/pokemon-view.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamAddComponent } from './team/team-add/team-add.component';
import { TeamSelectComponent } from './battle/team-select/team-select.component';
import { FightRoundsComponent } from './battle/fight-rounds/fight-rounds.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemons/view/:id', component: PokemonViewComponent },
  { path: 'pokemons/edit/:id', component: PokemonEditComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/add', component: TeamAddComponent },
  { path: 'battle/team-select', component: TeamSelectComponent },
  { path: 'battle/fight-rounds/team1/:team1/team2/:team2', component: FightRoundsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
