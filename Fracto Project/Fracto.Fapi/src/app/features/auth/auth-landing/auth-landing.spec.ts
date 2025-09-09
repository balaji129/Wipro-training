import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLandingComponent } from './auth-landing';

describe('AuthLanding', () => {
  let component: AuthLandingComponent;
  let fixture: ComponentFixture<AuthLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
