import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogConfigComponent } from './blog-config.component';

describe('BlogConfigComponent', () => {
  let component: BlogConfigComponent;
  let fixture: ComponentFixture<BlogConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
