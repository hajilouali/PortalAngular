import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdoctListModalComponent } from './prodoct-list-modal.component';

describe('ProdoctListModalComponent', () => {
  let component: ProdoctListModalComponent;
  let fixture: ComponentFixture<ProdoctListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdoctListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdoctListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
