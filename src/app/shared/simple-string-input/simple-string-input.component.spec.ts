import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStringInputComponent } from './simple-string-input.component';

describe('SimpleStringInputComponent', () => {
  let component: SimpleStringInputComponent;
  let fixture: ComponentFixture<SimpleStringInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleStringInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStringInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
