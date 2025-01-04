import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet1Component } from './sheet1.component';

describe('Sheet1Component', () => {
  let component: Sheet1Component;
  let fixture: ComponentFixture<Sheet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sheet1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
