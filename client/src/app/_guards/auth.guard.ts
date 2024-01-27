import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accservice = inject(AccountService);
  const router = inject(Router)
  const toastr = inject(ToastrService)
  return accservice.currentuser$.pipe(
    map(user => {
      if(user) {
        return true;
      }
      else {

        router.navigateByUrl('/login');
        toastr.error("Please Login to access this feature");
        return false;
      }
    }
  )
  )
};
