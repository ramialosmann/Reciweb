import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accservice = inject(AccountService);
  const router = inject(Router)

  return accservice.currentuser$.pipe(
    map(user => {
      if(user) {
        return true;
      }
      else {
        router.navigateByUrl('/login');
        return false;
      }
    }
  )
  )
};
