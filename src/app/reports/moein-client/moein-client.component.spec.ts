import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoeinClientComponent } from './moein-client.component';

describe('MoeinClientComponent', () => {
  let component: MoeinClientComponent;
  let fixture: ComponentFixture<MoeinClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoeinClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoeinClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
