import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  emailValidator,
  usernameValidator,
} from '../../utils/userInputFields.validator';
import { EMAIL_DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: 'JohnDoe',
    email: 'john.doe@gmeil.com',
    tel: '123-123-123',
  };

  form = new FormGroup({
    username: new FormControl(this.profileDetails.username, [
      Validators.required,
      Validators.minLength(5),
      usernameValidator(),
    ]),
    email: new FormControl(this.profileDetails.email, [
      Validators.required,
      emailValidator(EMAIL_DOMAINS),
    ]),
    tel: new FormControl(this.profileDetails.tel, [
      Validators.required,
      Validators.minLength(9),
    ]),
  });

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  isNotMinLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['minlength']
    );
  }

  isRegExInvalid(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.[`${controlName}Validator`]
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveEditedProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    this.toggleEditMode();
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
