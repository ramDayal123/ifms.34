import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeServiceDetailsComponent } from './employee-service-details.component';

describe('EmployeeServiceDetailsComponent', () => {
  let component: EmployeeServiceDetailsComponent;
  let fixture: ComponentFixture<EmployeeServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
