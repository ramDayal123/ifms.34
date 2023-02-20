import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouleBaseComponent } from './roule-base.component';

describe('RouleBaseComponent', () => {
  let component: RouleBaseComponent;
  let fixture: ComponentFixture<RouleBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouleBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouleBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
