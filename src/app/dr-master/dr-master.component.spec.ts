import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRMasterComponent } from './dr-master.component';

describe('DRMasterComponent', () => {
  let component: DRMasterComponent;
  let fixture: ComponentFixture<DRMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
