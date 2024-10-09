import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  private team: BehaviorSubject<Team | null>;

  constructor(private http: HttpClient) {
    this.http.get<Team[]>('/api/teams').subscribe({
      next: (teams) => { this.teams.next(teams) }
    });
    this.team = new BehaviorSubject<Team | null>(null);
  }

  getTeams(): Observable<Team[]> {
    return this.teams.asObservable();
  }

  getTeam(teamId: string): Team | undefined {
    return this.teams.getValue().find((team) => team.id === teamId);
  }

  getTeamPower(team: Team): number {
    if (team.pokemon1 && typeof team.pokemon1 === 'object' && team.pokemon1.power &&
      team.pokemon2 && typeof team.pokemon2 === 'object' && team.pokemon2.power &&
      team.pokemon3 && typeof team.pokemon3 === 'object' && team.pokemon3.power &&
      team.pokemon4 && typeof team.pokemon4 === 'object' && team.pokemon4.power &&
      team.pokemon5 && typeof team.pokemon5 === 'object' && team.pokemon5.power &&
      team.pokemon6 && typeof team.pokemon6 === 'object' && team.pokemon6.power) {
        return [
          team.pokemon1,
          team.pokemon2,
          team.pokemon3,
          team.pokemon4,
          team.pokemon5,
          team.pokemon6
        ].reduce((sum, obj) => sum + obj.power, 0);
      }
    return 0;
  }

  getPokemonImages(team: Team): string[] {
    if (team.pokemon1 && typeof team.pokemon1 === 'object' && team.pokemon1.image &&
      team.pokemon2 && typeof team.pokemon2 === 'object' && team.pokemon2.image &&
      team.pokemon3 && typeof team.pokemon3 === 'object' && team.pokemon3.image &&
      team.pokemon4 && typeof team.pokemon4 === 'object' && team.pokemon4.image &&
      team.pokemon5 && typeof team.pokemon5 === 'object' && team.pokemon5.image &&
      team.pokemon6 && typeof team.pokemon6 === 'object' && team.pokemon6.image) {
        return [
          team.pokemon1.image ?? '',
          team.pokemon2.image ?? '',
          team.pokemon3.image ?? '',
          team.pokemon4.image ?? '',
          team.pokemon5.image ?? '',
          team.pokemon6.image ?? ''
        ];
      }
    return [];
  }

  getTeamPokemons(team: Team): Pokemon[] {
    if (team.pokemon1 && typeof team.pokemon1 === 'object' &&
      team.pokemon2 && typeof team.pokemon2 === 'object' &&
      team.pokemon3 && typeof team.pokemon3 === 'object' &&
      team.pokemon4 && typeof team.pokemon4 === 'object' &&
      team.pokemon5 && typeof team.pokemon5 === 'object' &&
      team.pokemon6 && typeof team.pokemon6 === 'object') {
        return [
          team.pokemon1,
          team.pokemon2,
          team.pokemon3,
          team.pokemon4,
          team.pokemon5,
          team.pokemon6
        ];
      }
    return [];
  }

  addTeam(teamToAdd: Team, selectedPokemons: Pokemon[]): Observable<Team> {
    return this.http
      .post<Team>('/api/teams', teamToAdd)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .pipe(map((_: Team) => {
        const addedTeam: Team = {
          id: '',
          name: teamToAdd.name,
          user_id: teamToAdd.user_id,
          pokemon1: selectedPokemons[0],
          pokemon2: selectedPokemons[1],
          pokemon3: selectedPokemons[2],
          pokemon4: selectedPokemons[3],
          pokemon5: selectedPokemons[4],
          pokemon6: selectedPokemons[5],
        }
        this.team.next(addedTeam);
        this.teams.next([...this.teams.getValue(), addedTeam]);
        return addedTeam;
      }));
  }
}
