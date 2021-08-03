import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNoteComponent } from './all-note.component';

describe('AllNoteComponent', () => {
  let component: AllNoteComponent;
  let fixture: ComponentFixture<AllNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
