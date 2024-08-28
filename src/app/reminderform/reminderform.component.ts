import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DateTime } from 'luxon/src/datetime';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-reminderform',
  standalone: true,
  imports: [RouterModule,RouterOutlet,MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './reminderform.component.html',
  styleUrl: './reminderform.component.css'
})
export class ReminderformComponent {
  description: string = "";
  category: string = "";
 //date : string=""

  form: FormGroup;
  
  apiUrl = 'http://127.0.0.1:8000/task';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<ReminderformComponent>,
    
    //@Inject(MAT_DIALOG_DATA) public data: { date: string }//
  ) {
    console.log('form is called');
    this.form = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit() {
    console.log('Date input:');
  }

  onSubmit() {
   
    console.log('Form submitted');
    
      const reminder = {
        
        description: this.description,
        category: this.category
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      });
      this.http.post('http://127.0.0.1:8000/task', reminder).subscribe(
        response => {
          console.log('Reminder saved successfully:', response);
          this.dialogRef.close(true); // Close dialog with success status
        },
        error => {
          console.error('Error saving reminder:', error);
        }
      );
    }
  

  onCancel(): void {
    this.dialogRef.close();
  }



}
