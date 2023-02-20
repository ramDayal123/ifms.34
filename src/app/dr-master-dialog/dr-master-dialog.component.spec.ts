import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrMasterDialogComponent } from './dr-master-dialog.component';

describe('DrMasterDialogComponent', () => {
  let component: DrMasterDialogComponent;
  let fixture: ComponentFixture<DrMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrMasterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
