import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActivitiesComponent } from './form-activities.component';

describe('FormActivitiesComponent', () => {
  let component: FormActivitiesComponent;
  let fixture: ComponentFixture<FormActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
