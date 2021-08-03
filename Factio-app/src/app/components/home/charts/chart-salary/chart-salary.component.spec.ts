import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSalaryComponent } from './chart-salary.component';

describe('ChartSalaryComponent', () => {
  let component: ChartSalaryComponent;
  let fixture: ComponentFixture<ChartSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
