import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlformComponent } from './htmlform.component';

describe('HtmlformComponent', () => {
  let component: HtmlformComponent;
  let fixture: ComponentFixture<HtmlformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
