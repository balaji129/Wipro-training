import { Component,Input,Output } from '@angular/core';
import { DataserviceService } from '../../service/dataservice.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Input() title: string = '';
  users: any[] = [];
  firstName: string = '';
  age: number = 0;
  user: any = {};
  userId: number = 0;
   errorMessage: string = '';
constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => console.log('Data received:', data),
      // error: (err) => console.error('Final error after retries:', err),
       error: (error: Error) => {
        this.errorMessage = error.message;
      }
    
    });
  }


getusers() {
    this.dataService.getUsers().subscribe({
      next: (users) => this.users = users as any[],
      complete: () => console.log('Users fetched successfully'  ),
      error: (err) => console.error('Error fetching users:', err)
    });
  }
  addUser() {
    this.user = {
      id:Math.random().toString(36).substring(2, 15),
      firstName: this.firstName,
      age: this.age
    };
    console.log('Adding user:', this.user);
    this.dataService.addUser(this.user).subscribe({
      next: (user) => {
        console.log('User added successfully:', user);
        this.users.push(user);
        this.firstName = '';
        this.age = 0;
      }
      ,
     
      error: (err) => console.error('Error adding user:', err)
    });
  }
  updateUser(user: any) {
    console.log('Updating user:', user);
    this.dataService.updateUser(user).subscribe({
      next: (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error: (err) => console.error('Error updating user:', err)
    });
  }
  editUser(user: any) {
    this.userId = user.id;
    this.firstName = user.firstName;
    this.age = user.age;
    this.user = {id: this.userId, firstName: this.firstName, age: this.age};
    console.log('Editing user:', this.user);
  }
  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (err) => console.error('Error deleting user:', err)
    });
  }
}
