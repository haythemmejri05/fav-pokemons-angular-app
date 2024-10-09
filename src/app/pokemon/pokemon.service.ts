import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonType } from '../models/pokemon-type.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  pokemonTypes: BehaviorSubject<PokemonType[]> = new BehaviorSubject<
    PokemonType[]
  >([]);
  private pokemon: BehaviorSubject<Pokemon | null>;

  constructor(private http: HttpClient) {
    this.http.get<Pokemon[]>('/api/pokemons').subscribe({
      next: pokemons => {
        this.pokemons.next(pokemons);
      },
    });
    this.http.get<Pokemon[]>('/api/pokemon-types').subscribe({
      next: pokemonTypes => {
        this.pokemonTypes.next(pokemonTypes);
      },
    });
    this.pokemon = new BehaviorSubject<Pokemon | null>(null);
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.pokemons.asObservable();
  }

  getPokemonTypes(): Observable<PokemonType[]> {
    return this.pokemonTypes.asObservable();
  }

  getPokemon(pokemonId: string): Pokemon | undefined {
    return this.pokemons.getValue().find(pokemon => pokemon.id === pokemonId);
  }

  editPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`/api/pokemons/${pokemon.id}`, pokemon).pipe(
      map((pokemon: Pokemon) => {
        this.pokemon.next(pokemon);
        return pokemon;
      })
    );
  }
}
