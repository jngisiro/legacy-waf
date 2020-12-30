import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SokoComponent } from './soko.component';

describe('SokoComponent', () => {
  let component: SokoComponent;
  let fixture: ComponentFixture<SokoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SokoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SokoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
