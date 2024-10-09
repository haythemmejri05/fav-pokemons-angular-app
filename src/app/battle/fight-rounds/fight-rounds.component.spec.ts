import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightRoundsComponent } from './fight-rounds.component';

describe('FightRoundsComponent', () => {
  let component: FightRoundsComponent;
  let fixture: ComponentFixture<FightRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightRoundsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FightRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
