import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost/api/';
  pessoas = 'users/'
  contatos = 'contacts/'
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + this.pessoas);
  }
  getUserId(id: string): Observable<any> {
    return this.http.get(this.apiUrl + this.pessoas + id);
  }
  getContactId(id: string): Observable<any> {
    return this.http.get(this.apiUrl + this.contatos + id);
  }
  addUser(pessoa: any): Observable<any> {
    return this.http.post(this.apiUrl + this.pessoas, pessoa);
  }
  addContact(contato: any): Observable<any> {
    return this.http.post(this.apiUrl + this.contatos, contato);
  }

  editUser(id: string, pessoa: any): Observable<any> {
    return this.http.put(this.apiUrl + this.pessoas + id, pessoa);
  }
  editContact(id: string, pessoa: any): Observable<any> {
    return this.http.put(this.apiUrl + this.contatos + id, pessoa);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + this.pessoas + id);
  }
  deleteContact(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + this.contatos + id);
  }
}
