import { Component } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent {
  teams: Team[] = [];

  constructor(
    private teamSvc: TeamService) { }

  ngOnInit() {
    this.teamSvc.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  getTeams() {
    return this.teams;
  }
}
