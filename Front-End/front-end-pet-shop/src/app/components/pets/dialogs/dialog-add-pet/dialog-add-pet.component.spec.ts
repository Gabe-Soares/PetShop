import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPetComponent } from './dialog-add-pet.component';

describe('DialogAddPetComponent', () => {
  let component: DialogAddPetComponent;
  let fixture: ComponentFixture<DialogAddPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
