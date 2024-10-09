import { Pokemon } from './pokemon.model';

export interface Round {
  number: number; // Round number
  pokemon1: Pokemon; // Team1's Pokemon
  pokemon2: Pokemon; // Team2's Pokemon
  team1PokemonIndex: number; // Team1's Pokemon index
  team2PokemonIndex: number; // Team2's Pokemon index
  roundInProgress: boolean; // If the round is still in progress
  roundSimulated: boolean; // If the round is simulated
  winnerIndex: number[]; // The winner index (0 if no winner, 1 if team1 Pokemon is winner, 2 if team2 Pokemon is winner, 1 & 2 if the 2 fighting pokemons are both winners of the round)
}
