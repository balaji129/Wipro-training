import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { retry,catchError,Observable,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http:HttpClient) { }

getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      retry(3), // Retry up to 3 times if the request fails
      // catchError((error) => {
      //   console.error('Error after 3 retries:', error);
      //   throw error;
      // })
      catchError(this.handleError)
    );
  }

 private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Backend error: ${error.status} - ${error.message}`;
    }

    // Log the error (for example purposes, could be sent to an external service)
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  // Throw the error to the component
  }
  getUser(id: number) {
    return this.http.get('http://localhost:3000/users/'+id);
  }
  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }
  addUser(user: any) {
    return this.http.post('http://localhost:3000/users', user);
  }
  updateUser( user: any) {
    console.log('Updating user api:', user);
    return this.http.put('http://localhost:3000/users/'+user.id, user);
  }
  deleteUser(id: number) {
    return this.http.delete('http://localhost:3000/users/'+id);
  }
  patchUser(id: number, user: any) {
    return this.http.patch('http://localhost:3000/users/'+id, user);
}
}