/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepairersComponent } from './repairers.component';

describe('RepairersComponent', () => {
  let component: RepairersComponent;
  let fixture: ComponentFixture<RepairersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepairersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
