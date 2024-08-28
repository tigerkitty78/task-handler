import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderformComponent } from './reminderform.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';



describe('ReminderformComponent', () => {
  let component: ReminderformComponent;
  let fixture: ComponentFixture<ReminderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
