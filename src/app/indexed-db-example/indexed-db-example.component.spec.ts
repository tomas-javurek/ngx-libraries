import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedDbExampleComponent } from './indexed-db-example.component';

describe('IndexedDbExampleComponent', () => {
  let component: IndexedDbExampleComponent;
  let fixture: ComponentFixture<IndexedDbExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexedDbExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedDbExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
