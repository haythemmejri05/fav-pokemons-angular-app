import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleService } from '../battle.service';
import { TeamService } from '../../team/team.service';
import { Team } from '../../models/team.model';
import { Pokemon } from '../../models/pokemon.model';
import { Round } from '../../models/round.model';
import { Battle } from '../../models/battle.model';

@Component({
  selector: 'app-fight-rounds',
  templateUrl: './fight-rounds.component.html',
  styleUrl: './fight-rounds.component.scss',
})
export class FightRoundsComponent implements OnInit {
  team1Id = '';
  team2Id = '';
  team1: Team | undefined = undefined;
  team2: Team | undefined = undefined;
  roundNumber = 1;
  battle: Battle | undefined = undefined;
  updatePokemon1LifeInProgress = false;
  updatePokemon2LifeInProgress = false;
  needANewRound = false;
  battleFinished = false;
  teamWinning: Team | undefined = undefined;

  constructor(
    private teamSvc: TeamService,
    private battleSvc: BattleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.team1Id = params['team1'];
      if (this.team1Id) {
        this.team1 = this.teamSvc.getTeam(this.team1Id);
      }
      const pokemon1 = this.team1?.pokemon1;
      this.team2Id = params['team2'];
      if (this.team2Id) {
        this.team2 = this.teamSvc.getTeam(this.team2Id);
      }
      const pokemon2 = this.team2?.pokemon1;
      if (
        pokemon1 &&
        pokemon2 &&
        typeof pokemon1 === 'object' &&
        typeof pokemon2 === 'object'
      ) {
        const firstRound: Round = {
          number: 1,
          pokemon1,
          pokemon2,
          team1PokemonIndex: 1,
          team2PokemonIndex: 1,
          roundInProgress: false,
          roundSimulated: false,
          winnerIndex: [0],
        };
        if (
          this.team1 &&
          this.team2 &&
          typeof this.team1 === 'object' &&
          typeof this.team2 === 'object'
        ) {
          this.battle = {
            team1: this.team1,
            team2: this.team2,
            rounds: [firstRound],
          };
        }
      }
    });
  }

  getTeam1Pokemons(): Pokemon[] {
    if (
      this.team1?.pokemon1 &&
      typeof this.team1.pokemon1 === 'object' &&
      this.team1?.pokemon2 &&
      typeof this.team1.pokemon2 === 'object' &&
      this.team1?.pokemon3 &&
      typeof this.team1.pokemon3 === 'object' &&
      this.team1?.pokemon4 &&
      typeof this.team1.pokemon4 === 'object' &&
      this.team1?.pokemon5 &&
      typeof this.team1.pokemon5 === 'object' &&
      this.team1?.pokemon6 &&
      typeof this.team1.pokemon6 === 'object'
    ) {
      return [
        this.team1.pokemon1,
        this.team1.pokemon2,
        this.team1.pokemon3,
        this.team1.pokemon4,
        this.team1.pokemon5,
        this.team1.pokemon6,
      ];
    }
    return [];
  }

  getTeam2Pokemons(): Pokemon[] {
    if (
      this.team2?.pokemon1 &&
      typeof this.team2.pokemon1 === 'object' &&
      this.team2?.pokemon2 &&
      typeof this.team2.pokemon2 === 'object' &&
      this.team2?.pokemon3 &&
      typeof this.team2.pokemon3 === 'object' &&
      this.team2?.pokemon4 &&
      typeof this.team2.pokemon4 === 'object' &&
      this.team2?.pokemon5 &&
      typeof this.team2.pokemon5 === 'object' &&
      this.team2?.pokemon6 &&
      typeof this.team2.pokemon6 === 'object'
    ) {
      return [
        this.team2.pokemon1,
        this.team2.pokemon2,
        this.team2.pokemon3,
        this.team2.pokemon4,
        this.team2.pokemon5,
        this.team2.pokemon6,
      ];
    }
    return [];
  }

  shouldShowPrevious(): boolean {
    return this.roundNumber === 1;
  }

  shouldShowNext(): boolean {
    return this.battle?.rounds && this.roundNumber < this.battle?.rounds?.length
      ? false
      : true;
  }

  getFightingPokemon1(): Pokemon | undefined {
    return this.battle?.rounds[this.roundNumber - 1]?.pokemon1;
  }

  getFightingPokemon2(): Pokemon | undefined {
    return this.battle?.rounds[this.roundNumber - 1]?.pokemon2;
  }

  getWeaknessForBattle(): number[] {
    return [
      this.battleSvc.getWeaknessForBattle(
        this.getFightingPokemon1()!,
        this.getFightingPokemon2()!
      ),
      this.battleSvc.getWeaknessForBattle(
        this.getFightingPokemon2()!,
        this.getFightingPokemon1()!
      ),
    ];
  }

  fightRound() {
    const pokemon1Fighting = this.getFightingPokemon1();
    const pokemon2Fighting = this.getFightingPokemon2();
    if (pokemon1Fighting && pokemon2Fighting) {
      this.battle!.rounds[this.roundNumber - 1].roundInProgress = true;
      const [pokemon1NewLifeValue, pokemon2NewLifeValue] =
        this.battleSvc.calculateLifeForPokemonAfterRound(
          pokemon1Fighting,
          pokemon2Fighting
        );
      this.reduceLifeBars(pokemon1NewLifeValue, pokemon2NewLifeValue, 1);
    }
  }

  reduceLifeBars(
    pokemon1NewLifeValue: number,
    pokemon2NewLifeValue: number,
    amountToReduce: number
  ) {
    // Update Pokemon 1 life value
    const interval1 = setInterval(() => {
      this.updatePokemon1LifeInProgress = true;
      if (this.battle!.rounds[this.roundNumber - 1]?.pokemon1.life > 0) {
        this.battle!.rounds[this.roundNumber - 1].pokemon1.life -=
          amountToReduce;
      }
      if (
        this.battle!.rounds[this.roundNumber - 1].pokemon1.life <=
        pokemon1NewLifeValue
      ) {
        this.battle!.rounds[this.roundNumber - 1].pokemon1.life =
          pokemon1NewLifeValue;
        this.updatePokemon1LifeInProgress = false;
        if (!this.updatePokemon2LifeInProgress) {
          this.postUpdateLifeBars(pokemon1NewLifeValue, pokemon2NewLifeValue);
          this.updateTeam1PokemonLife(
            this.battle!.rounds[this.roundNumber - 1].team1PokemonIndex,
            pokemon1NewLifeValue
          );
          this.updateTeam2PokemonLife(
            this.battle!.rounds[this.roundNumber - 1].team2PokemonIndex,
            pokemon2NewLifeValue
          );
        }
        clearInterval(interval1);
      }
    }, 50);
    // Update Pokemon 2 life value
    const interval2 = setInterval(() => {
      this.updatePokemon2LifeInProgress = true;
      if (this.battle!.rounds[this.roundNumber - 1]?.pokemon2.life > 0) {
        this.battle!.rounds[this.roundNumber - 1].pokemon2.life -=
          amountToReduce;
      }
      if (
        this.battle!.rounds[this.roundNumber - 1].pokemon2.life <=
        pokemon2NewLifeValue
      ) {
        this.battle!.rounds[this.roundNumber - 1].pokemon2.life =
          pokemon2NewLifeValue;
        this.updatePokemon2LifeInProgress = false;
        if (!this.updatePokemon1LifeInProgress) {
          this.postUpdateLifeBars(pokemon1NewLifeValue, pokemon2NewLifeValue);
          this.updateTeam1PokemonLife(
            this.battle!.rounds[this.roundNumber - 1].team1PokemonIndex,
            pokemon1NewLifeValue
          );
          this.updateTeam2PokemonLife(
            this.battle!.rounds[this.roundNumber - 1].team2PokemonIndex,
            pokemon2NewLifeValue
          );
        }
        clearInterval(interval2);
      }
    }, 50);
  }

  postUpdateLifeBars(
    pokemon1NewLifeValue: number,
    pokemon2NewLifeValue: number
  ): void {
    this.needANewRound = true;
    this.battle!.rounds[this.roundNumber - 1].roundInProgress = false;
    this.battle!.rounds[this.roundNumber - 1].roundSimulated = true;
    console.log('this.needANewRound:', this.needANewRound);
    if (this.needANewRound) {
      if (!pokemon1NewLifeValue && pokemon2NewLifeValue) {
        this.battle!.rounds[this.roundNumber - 1].winnerIndex = [2];
      } else if (pokemon1NewLifeValue && !pokemon2NewLifeValue) {
        this.battle!.rounds[this.roundNumber - 1].winnerIndex = [1];
      } else if (!pokemon1NewLifeValue && !pokemon2NewLifeValue) {
        this.battle!.rounds[this.roundNumber - 1].winnerIndex = [1, 2];
      }
      const team1NextPokemon = this.getTeam1NextPokemon();
      const team2NextPokemon = this.getTeam2NextPokemon();
      if (!team1NextPokemon || !team2NextPokemon) {
        this.battleFinished = true;
        if (!team1NextPokemon) {
          this.teamWinning = this.team2;
        } else {
          this.teamWinning = this.team1;
        }
      } else {
        const nextRound: Round = {
          number: this.roundNumber + 1,
          pokemon1: { ...team1NextPokemon },
          pokemon2: { ...team2NextPokemon },
          team1PokemonIndex: this.shouldTeam1MoveToNextPokemon()
            ? this.battle!.rounds[this.roundNumber - 1].team1PokemonIndex + 1
            : this.battle!.rounds[this.roundNumber - 1].team1PokemonIndex,
          team2PokemonIndex: this.shouldTeam2MoveToNextPokemon()
            ? this.battle!.rounds[this.roundNumber - 1].team2PokemonIndex + 1
            : this.battle!.rounds[this.roundNumber - 1].team2PokemonIndex,
          roundInProgress: false,
          roundSimulated: false,
          winnerIndex: [0],
        };
        this.battle!.rounds.push(nextRound);
        this.updatePokemon1LifeInProgress = false;
        this.updatePokemon2LifeInProgress = false;
      }
    }
  }

  nextRound() {
    this.roundNumber++;
  }

  previousRound() {
    this.roundNumber--;
  }

  shouldTeam1MoveToNextPokemon(): boolean {
    return this.battle!.rounds[this.roundNumber - 1].winnerIndex.includes(2);
  }

  shouldTeam2MoveToNextPokemon(): boolean {
    return this.battle!.rounds[this.roundNumber - 1].winnerIndex.includes(1);
  }

  getTeam1NextPokemon(): Pokemon | undefined {
    const team1Pokemons = this.getTeam1Pokemons();
    return this.shouldTeam1MoveToNextPokemon()
      ? team1Pokemons.at(
          this.battle!.rounds[this.roundNumber - 1].team1PokemonIndex
        )
      : this.battle!.rounds[this.roundNumber - 1].pokemon1;
  }

  getTeam2NextPokemon(): Pokemon | undefined {
    const team2Pokemons = this.getTeam2Pokemons();
    return this.shouldTeam2MoveToNextPokemon()
      ? team2Pokemons.at(
          this.battle!.rounds[this.roundNumber - 1].team2PokemonIndex
        )
      : this.battle!.rounds[this.roundNumber - 1].pokemon2;
  }

  isRoundInProgress(): boolean {
    return this.battle!.rounds[this.roundNumber - 1].roundInProgress;
  }

  isRoundSimulated(): boolean {
    return this.battle!.rounds[this.roundNumber - 1].roundSimulated;
  }

  getWinnerIndex(): number[] {
    return this.battle!.rounds[this.roundNumber - 1].winnerIndex;
  }

  canSimulateFight(): boolean {
    return (
      this.battleFinished ||
      (!this.battleFinished &&
        !this.isRoundSimulated() &&
        !this.isRoundInProgress())
    );
  }

  updateTeam1PokemonLife(index: number, newLife: number): void {
    switch (index) {
      case 1: {
        if (typeof this.team1?.pokemon1 === 'object') {
          this.team1.pokemon1.life = newLife;
        }
        break;
      }
      case 2: {
        if (typeof this.team1?.pokemon2 === 'object') {
          this.team1.pokemon2.life = newLife;
        }
        break;
      }
      case 3: {
        if (typeof this.team1?.pokemon3 === 'object') {
          this.team1.pokemon3.life = newLife;
        }
        break;
      }
      case 4: {
        if (typeof this.team1?.pokemon4 === 'object') {
          this.team1.pokemon4.life = newLife;
        }
        break;
      }
      case 5: {
        if (typeof this.team1?.pokemon5 === 'object') {
          this.team1.pokemon5.life = newLife;
        }
        break;
      }
      case 6: {
        if (typeof this.team1?.pokemon6 === 'object') {
          this.team1.pokemon6.life = newLife;
        }
        break;
      }
      default:
        break;
    }
  }

  updateTeam2PokemonLife(index: number, newLife: number): void {
    switch (index) {
      case 1: {
        if (typeof this.team2?.pokemon1 === 'object') {
          this.team2.pokemon1.life = newLife;
        }
        break;
      }
      case 2: {
        if (typeof this.team2?.pokemon2 === 'object') {
          this.team2.pokemon2.life = newLife;
        }
        break;
      }
      case 3: {
        if (typeof this.team2?.pokemon3 === 'object') {
          this.team2.pokemon3.life = newLife;
        }
        break;
      }
      case 4: {
        if (typeof this.team2?.pokemon4 === 'object') {
          this.team2.pokemon4.life = newLife;
        }
        break;
      }
      case 5: {
        if (typeof this.team2?.pokemon5 === 'object') {
          this.team2.pokemon5.life = newLife;
        }
        break;
      }
      case 6: {
        if (typeof this.team2?.pokemon6 === 'object') {
          this.team2.pokemon6.life = newLife;
        }
        break;
      }
      default:
        break;
    }
  }

  getTeamWinningName(): string {
    return this.teamWinning?.name ?? '';
  }
}
