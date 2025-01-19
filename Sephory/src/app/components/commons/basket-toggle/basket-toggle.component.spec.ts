import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketToggleComponent } from './basket-toggle.component';

describe('BasketToggleComponent', () => {
  let component: BasketToggleComponent;
  let fixture: ComponentFixture<BasketToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
