import { Pipe, PipeTransform } from '@angular/core';
import { AuthResponse } from '../../services/auth';

@Pipe({ name: 'userName', standalone: false })
export class UserNamePipe implements PipeTransform {
  transform(value: AuthResponse | null): string {
    return value ? `${value.username} (${value.role})` : '';
  }
}

