// src/app/core/services/authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginUserDto} from "../dtos/login-user-dto.dto";
import {RegisterUserDto} from "../dtos/register-user-dto.dto";
import {environment} from "../../../environments/environment";
import {JwtService} from "./jwt.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../dtos/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}/USER-SERVICE/api/auth`;

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }


  registerUser(userType: string, registerUserDto: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/${userType}`, registerUserDto);
  }

  authenticate(loginUserDto: LoginUserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginUserDto);
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  private currentUserSubject = new BehaviorSubject<any>(this.decodeToken(localStorage.getItem('token')));
  currentUser$ = this.currentUserSubject.asObservable();

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const currentUserRole = this.getCurrentUserRole();
    return currentUserRole === role;
  }

  private decodeToken(token: string | null): any {
    if (token) {
      return this.jwtService.decodeToken(token);
    }
    return null;
  }
}
