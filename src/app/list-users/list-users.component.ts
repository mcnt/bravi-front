import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from '../api.service';
import { AddUsersComponent } from '../add-users/add-users.component';
import { delay } from 'rxjs';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { AddContactsComponent } from '../add-contacts/add-contacts.component';
import { NgFor } from '@angular/common';
import { EditContactsComponent } from '../edit-contacts/edit-contacts.component';
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [    
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    NgFor
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit{
  displayedColumns: string[] = ['nome', 'contatos', 'acoes'];
  dataSource: any[] = [];

  constructor(private apiService: ApiService,public dialog: MatDialog, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.apiService.getUsers().subscribe(
      (response: any) => {
        this.dataSource = response;
      },
      (error: any) => {
        this.snackBar.open('erro ao buscar usuarios', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
      
        });
      }
    );
  }
  addUser(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      data: {},
      width: '600px',
    });
  
    dialogRef.afterClosed().pipe(
      delay(500)
    ).subscribe(() => {
      this.getUsers();
    });
  }
  addContato(user: any): void {
    const dialogRef = this.dialog.open(AddContactsComponent, {
      data: {user: user},
      width: '600px',
    });
  
    dialogRef.afterClosed().pipe(
      delay(500)
    ).subscribe(() => {
      this.getUsers();
    });
  }
  editUser(user: any): void {
    const dialogRef = this.dialog.open(EditUsersComponent, {
      data: { user: user },
      width: '600px',
    });
  
    dialogRef.afterClosed().pipe(
      delay(500) // Atrasa a execução em 500ms para dar tempo de buscar users novos(0.5s)
    ).subscribe(() => {
      this.getUsers();
    });
  }
  editContact(contact: any) {
    const dialogRef = this.dialog.open(EditContactsComponent, {
      data: { contact: contact },
      width: '600px',
    });
  
    dialogRef.afterClosed().pipe(
      delay(500)
    ).subscribe(() => {
      this.getUsers();
    });
  }
  deleteUser(id: any): void {
    this.apiService.deleteUser(id).subscribe(
      (sucess: any) => {
        this.getUsers();
        this.snackBar.open(sucess.success, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      (error: any) => {
        this.snackBar.open(error.message, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
      
        });
      }
    );

  }
  deleteContact(id: any) {
    this.apiService.deleteContact(id).subscribe(
      (sucess: any) => {
        this.getUsers();
        this.snackBar.open(sucess.success, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      (error: any) => {
        this.snackBar.open(error.message, 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
      
        });
      }
    );
  }
}