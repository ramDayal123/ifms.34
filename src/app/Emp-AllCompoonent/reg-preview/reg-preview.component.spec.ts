import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPreviewComponent } from './reg-preview.component';

describe('RegPreviewComponent', () => {
  let component: RegPreviewComponent;
  let fixture: ComponentFixture<RegPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
