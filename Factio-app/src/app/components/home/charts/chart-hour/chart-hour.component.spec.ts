import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHourComponent } from './chart-hour.component';

describe('ChartHourComponent', () => {
  let component: ChartHourComponent;
  let fixture: ComponentFixture<ChartHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
