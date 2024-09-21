import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ButtonDirective,
        FloatLabelModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        Ripple
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
