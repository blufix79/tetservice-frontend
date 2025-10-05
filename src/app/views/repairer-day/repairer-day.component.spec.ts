import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairerDayComponent } from './repairer-day.component';

describe('RepairerDayComponent', () => {
  let component: RepairerDayComponent;
  let fixture: ComponentFixture<RepairerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
