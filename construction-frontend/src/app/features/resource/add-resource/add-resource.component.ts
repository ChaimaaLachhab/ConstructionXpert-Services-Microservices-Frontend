import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourceService } from '../../../core/services/resource.service';
import { ResourceType } from '../../../core/enums/resource-type.enum';


@Component({
  selector: 'app-add-resource',
  standalone: true,
  imports:[
    ReactiveFormsModule,
  ],
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  resourceForm !: FormGroup;
  resourceTypes = Object.values(ResourceType); // Enum values for the dropdown

  constructor(private fb: FormBuilder, private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      provider: ['', Validators.required],
      taskId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      this.resourceService.createResource(this.resourceForm.value).subscribe(response => {
        console.log('Resource created:', response);
        // Handle success, e.g., show a success message or redirect
      }, error => {
        console.error('Error creating resource:', error);
        // Handle error
      });
    }
  }
}
