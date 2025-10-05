import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairtypesComponent } from './repairtypes.component';

describe('RepairtypesComponent', () => {
  let component: RepairtypesComponent;
  let fixture: ComponentFixture<RepairtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
