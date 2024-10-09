import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonSvc: PokemonService) {}

  ngOnInit() {
    this.pokemonSvc.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

  getPokemons() {
    return this.pokemons;
  }
}
