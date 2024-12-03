import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailValidator, matchPasswordsValidator } from '../../utils/userInputFields.validator';
import { EMAIL_DOMAINS } from '../../constants';
import { usernameValidator } from '../../utils/userInputFields.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), usernameValidator()]),
    email: new FormControl('', [Validators.required, emailValidator(EMAIL_DOMAINS)]),
    tel: new FormControl('', [Validators.required, Validators.minLength(9)]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')]
      }
    )
  })

  isFieldTextMissing(controlName: string) { 
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    )
  }

  isNotMinLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['minlength']
    )
  } 

  isRegExInvalid(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.[`${controlName}Validator`]
    )
  }

  get passGroup() {
    return this.form.get('passGroup')
  }

  register() {
    if(this.form.invalid) {
      return;
    }
    
    console.log(this.form.value);

  }
}
