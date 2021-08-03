import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHourComponent } from './add-edit-hour.component';

describe('AddHourComponent', () => {
  let component: AddEditHourComponent;
  let fixture: ComponentFixture<AddEditHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
