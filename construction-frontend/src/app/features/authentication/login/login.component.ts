import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {Ripple} from "primeng/ripple";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Router} from "@angular/router";
import {JwtService} from "../../../core/services/jwt.service";
import {LoginUserDto} from "../../../core/dtos/login-user-dto.dto";
import {LoginResponse} from "../../../core/dtos/login-response.model";
import {Role} from "../../../core/enums/role";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonDirective,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    Ripple,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      console.error('Form is not valid.');
      return;
    }

    const formValues = this.loginForm.value;
    const loginUser: LoginUserDto = {
      userNameOrEmail: formValues.userNameOrEmail,
      password: formValues.password
    };

    this.authService.authenticate(loginUser).subscribe({
      next: (response : LoginResponse) => this.handleLoginSuccess(response),
      error: (err) => this.handleLoginError(err),
      complete: () => console.log('Login process complete.')
    });
  }

  private handleLoginSuccess(response: LoginResponse) {
    console.log('Login successful:', response);

    const token = response?.token;
    if (!token) {
      console.error('No token found in the response.');
      return;
    }

    console.log('Token expires in:', response.expiresIn);

    try {
      const role: string | null = this.jwtService.getUserRole(token);

      if (role) {
        this.jwtService.setUserRole(role);
        this.redirectUserByRole(role);
      } else {
        console.error('No role found in the token.');
      }
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  }



  private handleLoginError(error: any) {
    console.error('Login failed:', error);
  }

  private redirectUserByRole(role: string | null) {
    switch (role) {
      case Role.ADMIN.toString():
        this.router.navigate(['/dashboard']);
        break;
      case Role.CUSTOMER.toString():
        this.router.navigate(['/dashboard']);
        break;
      default:
        console.error('Unknown role:', role);
        break;
    }
  }
}
