import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.scss'
})
export class EditUsersComponent implements OnInit  {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<EditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService, private snackBar: MatSnackBar) { } 

  
  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser(): void {
    this.apiService.getUserId(this.data.user.id).subscribe((user: any) => {
      this.user = user;
    });
  }
  editUser(id: string, user: any): void {
    this.apiService.editUser(id, user).subscribe(
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
