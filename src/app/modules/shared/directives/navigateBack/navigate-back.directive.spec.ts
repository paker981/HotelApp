import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NavigateBackDirective } from './navigate-back.directive';
import { Component } from '@angular/core';




describe('NavigateBackDirective', () => {

  @Component({
    template: `
      <button NavigateBack></button>
    `
  })
  class TestComponent {}

  let fixture: ComponentFixture<any>;
  let location: Location;

  const locationMock = {
    back: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigateBackDirective,TestComponent],
      providers: [
        {
          provide: Location,
          useValue: locationMock
        }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should navigate back on click', () => {
    // given
    const anchor = fixture.debugElement.query(By.directive(NavigateBackDirective));

    // when
    anchor.nativeElement.click();

    // then
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('przykład integracyjnego', () => {
    // given
    // budujesz komponent z realnym serwisem

    // when
    // component.startCounter() // podspodem robi service.counterStart()

    // then
    // check temaplatki po sekundzie/dwóch/trzech
  });
});