import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonType } from '../../models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.scss',
})
export class PokemonEditComponent implements OnInit {
  pokemonId = '';
  pokemon: Pokemon | undefined = undefined;
  editPokemonError = false;
  pokemonTypes: PokemonType[] = [];
  pokemonTypeId = '';

  constructor(
    private pokemonSvc: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id'];
      if (this.pokemonId) {
        this.pokemon = this.pokemonSvc.getPokemon(this.pokemonId);
        if (!this.pokemon) {
          this.router.navigate(['/pokemons']);
        }
        if (
          this.pokemon &&
          typeof this.pokemon.type === 'object' &&
          this.pokemon.type !== null
        ) {
          this.pokemonTypeId = this.pokemon.type.id;
        } else {
          this.router.navigate(['/pokemons']);
        }
      }
    });
    this.pokemonSvc.getPokemonTypes().subscribe(pokemonTypes => {
      this.pokemonTypes = pokemonTypes;
    });
  }

  getPokemonTypes() {
    return this.pokemonTypes;
  }

  back() {
    this.router.navigate(['/pokemons/view/', this.pokemonId]);
  }

  editPokemon() {
    this.editPokemonError = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...newPokemon } = this.pokemon!;
    this.pokemonSvc
      .editPokemon({ type: this.pokemonTypeId, ...newPokemon })
      .subscribe({
        next: () => this.router.navigate(['/pokemons/view/', this.pokemon!.id]),
        error: () => (this.editPokemonError = true),
      });
  }
}
