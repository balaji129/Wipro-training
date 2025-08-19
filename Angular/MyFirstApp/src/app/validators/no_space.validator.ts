import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Don't validate if empty

    const hasSpace = /\s/.test(control.value);
    return hasSpace ? { noSpaces: true } : null;
  };
}
