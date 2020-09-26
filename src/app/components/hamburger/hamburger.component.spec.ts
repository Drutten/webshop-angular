import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerComponent } from './hamburger.component';

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamburgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle #isOpen', () => {
    expect(component.isOpen).toBe(false);
    component.onToggle();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
    component.onToggle();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('should emit when toggled', () => {
    const spy = spyOn(component.toggledHamburger, 'emit');
    component.onToggle();
    expect(spy).toHaveBeenCalled();
  })
});
