import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../../team/team.service';
import { Router } from '@angular/router';
import { BattleService } from '../battle.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrl: './team-select.component.scss',
})
export class TeamSelectComponent implements OnInit {
  teams: Team[] = [];
  selectedTeams: Team[] = [];
  selectTeamsError = false;

  constructor(
    private teamSvc: TeamService,
    private battleSvc: BattleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teamSvc.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  getTeams() {
    return this.teams;
  }

  fight() {
    this.battleSvc.selectedTeams = [...this.selectedTeams];
    this.router.navigate([
      '/battle/fight-rounds/team1',
      this.selectedTeams[0].id,
      'team2',
      this.selectedTeams[1].id,
    ]);
  }

  back() {
    this.router.navigate(['/teams']);
  }

  selectTeam(index: number, team: Team) {
    this.selectedTeams[index - 1] = team;
  }

  getSelectTeam(index: number): string {
    return this.selectedTeams[index - 1]?.name || '';
  }

  checkSelectedTeamsInput(): boolean {
    if (
      this.selectedTeams &&
      this.selectedTeams[0] &&
      this.selectedTeams[1] &&
      this.selectedTeams[0].id !== this.selectedTeams[1].id
    ) {
      return false;
    }
    return true;
  }

  shouldFormBeDisabled(formInvalid: boolean): boolean {
    return !formInvalid ? this.checkSelectedTeamsInput() : true;
  }
}
