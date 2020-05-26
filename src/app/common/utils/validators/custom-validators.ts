import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppUtils } from '../AppUtils';

/* export class CustomValidators
{
    static datesValidator(form: FormGroup)
    {
      / *
        const password=form.get('dateDebut').value;
        const passwordcopy=form.get('dateFin').value;
        return password!==passwordcopy ? { matchingError: true} : null;
        * /
      const dateDebut: Date = form.get('dateDebut').value;
      const dateFin: Date = form.get('dateFin').value;
      if(dateDebut <= dateFin) return null;
      return { matchingError: true};
    }

    static dateNaissanceValidator(form: FormGroup)
    {
        const dateNaissance: Date = form.get('dateNaissance').value;
        if(dateNaissance===null || dateNaissance===undefined) return null;

        const today=new Date();
        if(dateNaissance>= today) return { error: true };
        const nbDays = AppUtils.diffInDaysBetweenDates(dateNaissance, today);
        if(nbDays<0) return null;
        if (nbDays < 365 * 3 ) return { error: true };
        return null;
    }
} */


export function ageRangeValidator(min: number, max: number): ValidatorFn 
{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { ageRange: true };
        }
        return null;
    };
}
