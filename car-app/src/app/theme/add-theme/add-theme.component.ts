import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  form = new FormGroup({
    themeName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    postText: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
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

  constructor(private apiService: ApiService) {}

  addTheme() {
    // this.apiService.createTheme(themeName, postText).subscribe(data => {
    //   console.log({themeName, postText});
    // })
  }
}
