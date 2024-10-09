import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { Router } from '@angular/router';
import { PokemonService } from '../../pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrl: './team-add.component.scss',
})
export class TeamAddComponent implements OnInit {
  pokemon1Id = '';
  team: Team = {
    id: '',
    name: '',
    user_id: '21bd790e-024f-4bf7-b1fa-0246ec8d3dec',
    pokemon1: '',
    pokemon2: '',
    pokemon3: '',
    pokemon4: '',
    pokemon5: '',
    pokemon6: '',
  };
  addTeamError = false;
  pokemons: Pokemon[] = [];
  selectedPokemons: Pokemon[] = [];

  constructor(
    private pokemonSvc: PokemonService,
    private teamSvc: TeamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonSvc.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

  getPokemons() {
    return this.pokemons;
  }

  back() {
    this.router.navigate(['/teams']);
  }

  selectPokemon(index: number, pokemon: Pokemon) {
    switch (index) {
      case 1: {
        this.team.pokemon1 = pokemon.id;
        break;
      }
      case 2: {
        this.team.pokemon2 = pokemon.id;
        break;
      }
      case 3: {
        this.team.pokemon3 = pokemon.id;
        break;
      }
      case 4: {
        this.team.pokemon4 = pokemon.id;
        break;
      }
      case 5: {
        this.team.pokemon5 = pokemon.id;
        break;
      }
      case 6: {
        this.team.pokemon6 = pokemon.id;
        break;
      }
      default:
        break;
    }
    this.selectedPokemons[index - 1] = pokemon;
  }

  addTeam() {
    this.addTeamError = false;
    this.teamSvc.addTeam(this.team, this.selectedPokemons).subscribe({
      next: () => this.router.navigate(['/teams']),
      error: () => (this.addTeamError = true),
    });
  }

  getSelectPokemonName(index: number): string {
    return this.selectedPokemons[index]?.name || '';
  }

  checkSelectedPokemonsInput(): boolean {
    if (
      this.selectedPokemons &&
      this.selectedPokemons[0] &&
      this.selectedPokemons[1] &&
      this.selectedPokemons[2] &&
      this.selectedPokemons[3] &&
      this.selectedPokemons[4] &&
      this.selectedPokemons[5]
    ) {
      return false;
    }
    return true;
  }

  shouldFormBeDisabled(formInvalid: boolean): boolean {
    return !formInvalid ? this.checkSelectedPokemonsInput() : true;
  }
}
