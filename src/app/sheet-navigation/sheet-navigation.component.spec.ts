import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetNavigationComponent } from './sheet-navigation.component';

describe('SheetNavigationComponent', () => {
  let component: SheetNavigationComponent;
  let fixture: ComponentFixture<SheetNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
