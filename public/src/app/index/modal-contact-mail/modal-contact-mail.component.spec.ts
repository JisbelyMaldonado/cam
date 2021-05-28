import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactMailComponent } from './modal-contact-mail.component';

describe('ModalContactMailComponent', () => {
  let component: ModalContactMailComponent;
  let fixture: ComponentFixture<ModalContactMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContactMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
