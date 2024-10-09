import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss',
})
export class PokemonViewComponent implements OnInit {
  pokemonId = '';
  pokemon: Pokemon | undefined = undefined;

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
      }
    });
  }

  getPokemonType(): string {
    if (
      this.pokemon &&
      typeof this.pokemon.type === 'object' &&
      this.pokemon.type !== null
    ) {
      return this.pokemon.type.name;
    }
    return '';
  }

  editPokemon() {
    this.router.navigate(['/pokemons/edit/', this.pokemonId]);
  }

  back() {
    this.router.navigate(['/pokemons']);
  }
}
