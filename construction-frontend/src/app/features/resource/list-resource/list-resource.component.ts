import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-resource',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './list-resource.component.html',
  styleUrl: './list-resource.component.css'
})
export class ListResourceComponent {

}
