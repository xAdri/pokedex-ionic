import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinigamePage } from './minigame.page';

describe('MinigamePage', () => {
  let component: MinigamePage;
  let fixture: ComponentFixture<MinigamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinigamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
