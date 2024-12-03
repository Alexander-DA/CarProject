import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domainStr = domains.join('|');
//   const regExp = new RegExp(`^(?:[a-z][a-zA-Z0-9]{5,}@gmail\.(${domainStr})|[a-z][a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}@gmail\.(${domainStr}))$`);
  const regExp = new RegExp(`^(?!\d)[a-zA-Z0-9.]{6,}@gmail\.(${domainStr})$`);
    // const regExp = new RegExp(`[A-Za-z0-9]{6,}+@gmail\.(${domainStr})`);

return (control) => {
  const isInvalid = control.value === '' || regExp.test(control.value)
  return isInvalid ? null : { emailValidator: true };
  };
}

export function usernameValidator(): ValidatorFn {
  const regExp = new RegExp(`^[A-Z]`);

  return (control) => {
    const isInvalid = control.value === '' || regExp.test(control.value)
    return isInvalid ? null : { usernameValidator: true };
  };
}

export function matchPasswordsValidator(passControlName: string, rePassControlName: string): ValidatorFn {
  return (control) => {
    const passFormControl = control.get(passControlName);
    const rePassFormControl = control.get(rePassControlName);

    const areMatching = passFormControl?.value === rePassFormControl?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}


