import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketRecapComponent } from './basket-recap.component';

describe('BasketRecapComponent', () => {
  let component: BasketRecapComponent;
  let fixture: ComponentFixture<BasketRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
