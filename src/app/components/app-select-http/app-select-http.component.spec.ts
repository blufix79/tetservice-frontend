import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectHttpComponent } from './app-select-http.component';

describe('AppSelectHttpComponent', () => {
  let component: AppSelectHttpComponent;
  let fixture: ComponentFixture<AppSelectHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSelectHttpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSelectHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
