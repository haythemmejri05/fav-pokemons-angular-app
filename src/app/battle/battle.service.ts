import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weakness } from '../models/weakness.model';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  selectedTeams: Team[] = [];
  weakness: BehaviorSubject<Weakness[]> = new BehaviorSubject<Weakness[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Weakness[]>('/api/weakness').subscribe({
      next: (weakness) => { this.weakness.next(weakness) }
    });
  }

  getWeakness(): Observable<Weakness[]> {
    return this.weakness.asObservable();
  }

  getWeaknessForBattle(pokemon1: Pokemon, pokemon2: Pokemon): number {
    const type1 = pokemon1.type && typeof pokemon1.type === 'object' ? pokemon1.type.id : pokemon1.type;
    const type2 = pokemon2.type && typeof pokemon2.type === 'object' ? pokemon2.type.id : pokemon2.type;
    return this.weakness.getValue().find((item) => {
      const weaknessType1 = item.type1 && typeof item.type1 === 'object' ? item.type1.id : item.type1;
      const weaknessType2 = item.type2 && typeof item.type2 === 'object' ? item.type2.id : item.type2;
      return weaknessType1 === type1 && weaknessType2 === type2
    })?.factor || 0;
  }

  calculateLifeForPokemonAfterRound(pokemon1: Pokemon, pokemon2: Pokemon): number[] {
    const pokemon1WeaknessBattle = this.getWeaknessForBattle(pokemon2, pokemon1);
    let remainingLifePokemon1 = pokemon1.life - (pokemon2.power * pokemon1WeaknessBattle);
    if (remainingLifePokemon1 <= 0) {
      remainingLifePokemon1 = 0;
    }
    const pokemon2WeaknessBattle = this.getWeaknessForBattle(pokemon1, pokemon2);
    let remainingLifePokemon2 = pokemon2.life - (pokemon1.power * pokemon2WeaknessBattle);
    if (remainingLifePokemon2 <= 0) {
      remainingLifePokemon2 = 0;
    }
    return [Math.round(remainingLifePokemon1), Math.round(remainingLifePokemon2)];
  }
}
