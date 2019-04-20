import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMediaExampleComponent } from './user-media-example.component';

describe('UserMediaExampleComponent', () => {
  let component: UserMediaExampleComponent;
  let fixture: ComponentFixture<UserMediaExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMediaExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMediaExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
