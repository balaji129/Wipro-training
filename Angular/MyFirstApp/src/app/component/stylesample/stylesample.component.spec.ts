import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesampleComponent } from './stylesample.component';

describe('StylesampleComponent', () => {
  let component: StylesampleComponent;
  let fixture: ComponentFixture<StylesampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylesampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylesampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
