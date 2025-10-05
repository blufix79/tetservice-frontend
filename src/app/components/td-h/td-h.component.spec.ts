import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdHComponent } from './td-h.component';

describe('TdHComponent', () => {
  let component: TdHComponent;
  let fixture: ComponentFixture<TdHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
