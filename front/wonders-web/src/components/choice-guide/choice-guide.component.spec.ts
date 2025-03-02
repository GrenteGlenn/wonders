import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceGuideComponent } from './choice-guide.component';

describe('ChoiceGuideComponent', () => {
  let component: ChoiceGuideComponent;
  let fixture: ComponentFixture<ChoiceGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
