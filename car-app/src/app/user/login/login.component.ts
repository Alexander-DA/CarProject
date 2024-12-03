import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_DOMAINS } from '../../constants';
import { emailValidator } from '../../utils/userInputFields.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator(EMAIL_DOMAINS)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
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

  constructor(private userService: UserService, private router: Router) {}

  login() {

    if(this.form.invalid) {
      return;
    }
    this.userService.login();
    this.router.navigate(['/home'])
  }
}
