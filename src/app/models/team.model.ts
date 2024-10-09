import { Pokemon } from './pokemon.model';

export interface Team {
  id: string; // UUID
  user_id: string; // UUID referencing the user
  name: string; // Team name
  pokemon1: Pokemon | string; // UUID of Pokemon 1
  pokemon2: Pokemon | string; // UUID of Pokemon 2
  pokemon3: Pokemon | string; // UUID of Pokemon 3
  pokemon4: Pokemon | string; // UUID of Pokemon 4
  pokemon5: Pokemon | string; // UUID of Pokemon 5
  pokemon6: Pokemon | string; // UUID of Pokemon 6
}
