import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenefitComponent } from './add-benefit.component';

describe('AddBenefitComponent', () => {
  let component: AddBenefitComponent;
  let fixture: ComponentFixture<AddBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
