import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivityComponent } from './modal-activity.component';

describe('ModalActivityComponent', () => {
  let component: ModalActivityComponent;
  let fixture: ComponentFixture<ModalActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
