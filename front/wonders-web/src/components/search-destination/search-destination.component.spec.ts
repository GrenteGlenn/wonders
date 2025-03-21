import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDestinationComponent } from './search-destination.component';

describe('SearchDestinationComponent', () => {
  let component: SearchDestinationComponent;
  let fixture: ComponentFixture<SearchDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
