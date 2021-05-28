import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedElementWhatsappComponent } from './fixed-element-whatsapp.component';

describe('FixedElementWhatsappComponent', () => {
  let component: FixedElementWhatsappComponent;
  let fixture: ComponentFixture<FixedElementWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedElementWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedElementWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
