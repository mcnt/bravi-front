import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';


export interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent {
  user: User = {
    name: '',
    email: ''
  };

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<AddUsersComponent>, private snackBar: MatSnackBar) { }

  addUser(user: any): void {
    this.apiService.addUser(user).subscribe(
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
    this.dialogRef.close(user);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
