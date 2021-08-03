import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBenefitComponent } from './show-benefit.component';

describe('ShowBenefitComponent', () => {
  let component: ShowBenefitComponent;
  let fixture: ComponentFixture<ShowBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
