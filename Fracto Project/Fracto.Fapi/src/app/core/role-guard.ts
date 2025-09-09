import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const userRole = this.tokenStorage.getRole();

    if (expectedRoles && expectedRoles.includes(userRole!)) {
      return true;
    }

    alert('Access denied. Admins only.');
    this.router.navigate(['/']);
    return false;
  }
}
