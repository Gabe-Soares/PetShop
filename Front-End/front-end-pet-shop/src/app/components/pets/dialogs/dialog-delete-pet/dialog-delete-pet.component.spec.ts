import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletePetComponent } from './dialog-delete-pet.component';

describe('DialogDeletePetComponent', () => {
  let component: DialogDeletePetComponent;
  let fixture: ComponentFixture<DialogDeletePetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeletePetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeletePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
