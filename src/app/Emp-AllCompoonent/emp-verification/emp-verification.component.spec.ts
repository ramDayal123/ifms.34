import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpVerificationComponent } from './emp-verification.component';

describe('EmpVerificationComponent', () => {
  let component: EmpVerificationComponent;
  let fixture: ComponentFixture<EmpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
