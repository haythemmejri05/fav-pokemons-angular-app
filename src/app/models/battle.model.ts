import { Round } from "./round.model";
import { Team } from "./team.model";

export interface Battle {
  team1: Team;        // Team1
  team2: Team;        // Team2
  rounds: Round[];    // Battle' rounds
}
