import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBenefitComponent } from './edit-benefit.component';

describe('EditBenefitComponent', () => {
  let component: EditBenefitComponent;
  let fixture: ComponentFixture<EditBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
