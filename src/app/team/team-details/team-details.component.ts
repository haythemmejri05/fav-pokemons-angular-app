import { Component, Input } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../team.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss'
})
export class TeamDetailsComponent {
  @Input() team!: Team;

  constructor(private teamSvc: TeamService) { }

  getPokemonImages(): string[] {
    return this.teamSvc.getPokemonImages(this.team);
  }

  getTeamPokemons(): Pokemon[] {
    return this.teamSvc.getTeamPokemons(this.team);
  }

  getTeamPower(): number {
    return this.teamSvc.getTeamPower(this.team);
  }
}
