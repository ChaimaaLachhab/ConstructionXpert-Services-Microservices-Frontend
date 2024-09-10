import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { RegisterUserDto } from '../../../core/dtos/register-user-dto.dto';
import { RouterLink, RouterOutlet} from "@angular/router";
import { MatCard, MatCardContent} from "@angular/material/card";
import { MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput} from "@angular/material/input";
import { MatAnchor, MatButton} from "@angular/material/button";
import { MatOption, MatSelect} from "@angular/material/select";
import {Location, NgIf} from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    MatCard,
    MatCardContent,
    RouterLink,
    MatLabel,
    MatFormField,
    MatInput,
    MatAnchor,
    MatButton,
    MatSelect,
    MatOption,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private location: Location
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordStrengthValidator
      ]],
      userType: ['', Validators.required]
    });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialCharacter;
    return !valid ? { passwordStrength: 'Password must contain uppercase, lowercase, number, and special character.' } : null;
  }


  register() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const registerUserDto: RegisterUserDto = {
        userName: formValues.userName,
        email: formValues.email,
        password: formValues.password
      };

      this.authService.registerUser(formValues.userType, registerUserDto).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.location.back();        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    }
  }
}
