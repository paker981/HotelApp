import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component"

describe('AppComponent', ()=>{
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', ()=>{
    expect(component.title).toEqual('HotelApp');
  })
})