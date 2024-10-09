import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  @Input() pokemon!: Pokemon;

  getPokemonType(pokemon: Pokemon): string {
    if (typeof pokemon.type === 'object' && pokemon.type !== null) {
      return pokemon.type.name;
    }
    return '';
  }
}
