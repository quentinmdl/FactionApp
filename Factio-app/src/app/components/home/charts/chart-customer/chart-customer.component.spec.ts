import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCustomerComponent } from './chart-customer.component';

describe('ChartCustomerComponent', () => {
  let component: ChartCustomerComponent;
  let fixture: ComponentFixture<ChartCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
