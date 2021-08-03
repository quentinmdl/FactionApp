import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBenefitComponent } from './all-benefit.component';

describe('AllBenefitComponent', () => {
  let component: AllBenefitComponent;
  let fixture: ComponentFixture<AllBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
