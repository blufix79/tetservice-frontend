/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InterventionsComponent } from './interventions.component';

describe('InterventionsComponent', () => {
  let component: InterventionsComponent;
  let fixture: ComponentFixture<InterventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
