import { PokemonType } from "./pokemon-type.model";

export interface Pokemon {
  id: string;     // UUID
  name: string;   // Pokemon name
  type: PokemonType | string;   // UUID referencing Pokemon type
  image: string;  // URL to Pokemon image
  power: number;  // Between 10 and 100
  life: number;   // Between 50 and 100
}
