import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiketsComponent } from './list-tikets.component';

describe('ListTiketsComponent', () => {
  let component: ListTiketsComponent;
  let fixture: ComponentFixture<ListTiketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTiketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTiketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
