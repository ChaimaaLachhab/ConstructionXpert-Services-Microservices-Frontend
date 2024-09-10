import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { LoginUserDto } from '../../../core/dtos/login-user-dto.dto';
import {jwtDecode} from "jwt-decode";
import {JwtService} from "../../../core/services/jwt.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    MatCard,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatCheckbox,
    MatInput,
    MatAnchor,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private jwtService : JwtService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const loginUser: LoginUserDto = {
        userNameOrEmail: formValues.userNameOrEmail,
        password: formValues.password
      };

      this.authService.authenticate(loginUser).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          const token = response?.token;
          if (token) {
            localStorage.setItem('token', token);
            console.log('Token expires in:', response.expiresIn);

            try {
              const role = this.jwtService.getUserRole(token);

              if (role === 'ADMIN') {
                this.router.navigate(['/admin/dashboard']);
              } else if (role === 'USER') {
                this.router.navigate(['/user/dashboard-user']);
              } else if (role === 'TECH') {
                this.router.navigate(['/tech/dashboard-tech']);
              } else {
                console.error('Unknown role:', role);
              }
            } catch (error) {
              console.error('Token decoding failed:', error);
            }
          } else {
            console.error('No token found in the response.');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
        complete: () => {
          console.log('Login process complete.');
        }
      });
    }
  }
}
