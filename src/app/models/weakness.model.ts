import { PokemonType } from './pokemon-type.model';

export interface Weakness {
  id: string; // UUID
  type1: PokemonType | string; // UUID referencing Pokemon type
  type2: PokemonType | string; // UUID referencing Pokemon type
  factor: number; // Weakness factor (float)
}
