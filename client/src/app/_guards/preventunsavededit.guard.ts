import { CanDeactivateFn } from '@angular/router';
import { EditProfileComponent } from '../members/edit-profile/edit-profile.component';
import { EditrecipeComponent } from '../recipes/editrecipe/editrecipe.component';

export const preventunsavededitGuard: CanDeactivateFn<EditProfileComponent | EditrecipeComponent> = (component) => {
  if(component.editform?.dirty) {
    return confirm("Are you sure you want to leave ? any unsaved changes will be lost")
  }
  return true;
};
