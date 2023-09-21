import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { ContainerComponent } from './container.component';
import { AuthService } from '@app/modules/Auth/services/auth.service';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';

  
describe('ContainerAdminComponent', () => {
  const authServiceMock = {
    logOut: jest.fn()
  }

  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [MatToolbarModule, RouterTestingModule],
      providers: [
        { 
            provide:AuthService,
            useValue: authServiceMock
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    // integration
    // const compiled = fixture.nativeElement;
    // const links = compiled.querySelectorAll('a');
    // expect(links.length).toBe(3); // Expect three navigation links
    // expect(links[0].textContent).toContain('Log Out');
    // expect(links[1].textContent).toContain('Rooms');
    // expect(links[2].textContent).toContain('Advertisement');
  });


  it('should logout after call onLogout', () => {
    // when
    component.onLogout();

    // then
    expect(authServiceMock.logOut).toHaveBeenCalled();
  })
});