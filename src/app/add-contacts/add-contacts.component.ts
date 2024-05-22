import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
export interface Contact {
  type: string;
  user_id: string;
  value: string
}

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDialogModule, MatButtonModule,MatSelectModule],
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.scss'
})
export class AddContactsComponent {
  types: any = [
    'telefone', 'email', 'whatsapp'
  ];
  contact: Contact = {
    type: '',
    user_id: this.data.user.id,
    value: '',
  };


  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<AddContactsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar) { }

  addContact(contact: any): void {
    this.apiService.addContact(contact).subscribe(
      (response) => {
        this.snackBar.open(response.message, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
      
        });
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
      
        });

      }
    );
    this.dialogRef.close(contact);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
