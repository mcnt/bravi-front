import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-edit-contacts',
  standalone: true,
  imports: [FormsModule, MatInputModule,MatSelectModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-contacts.component.html',
  styleUrl: './edit-contacts.component.scss'
})
export class EditContactsComponent {
  contact: any;
  types: any = [
    'telefone', 'email', 'whatsapp'
  ];
  constructor(
    public dialogRef: MatDialogRef<EditContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService, private snackBar: MatSnackBar) { } 

      
  ngOnInit(): void {
    this.fetchContact();
  }

  fetchContact(): void {
    this.apiService.getContactId(this.data.contact.id).subscribe((contact: any) => {
      this.contact = contact;
    });
  }

  editContact(id: string, user: any): void {
    this.apiService.editContact(id, user).subscribe(
      (success: any) => {

        this.snackBar.open(success.success, 'Fechar', {
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
    this.dialogRef.close(user);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
