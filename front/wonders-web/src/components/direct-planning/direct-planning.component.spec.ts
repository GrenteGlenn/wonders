import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectPlanningComponent } from './direct-planning.component';

describe('DirectPlanningComponent', () => {
  let component: DirectPlanningComponent;
  let fixture: ComponentFixture<DirectPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
