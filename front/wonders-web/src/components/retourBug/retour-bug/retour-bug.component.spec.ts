import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourBugComponent } from './retour-bug.component';

describe('RetourBugComponent', () => {
  let component: RetourBugComponent;
  let fixture: ComponentFixture<RetourBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourBugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
