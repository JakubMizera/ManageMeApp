import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Functionality, User } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      duration: new FormControl(1, [Validators.required, Validators.min(1)]),
      expectedDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
      hoursWorked: new FormControl(0, [Validators.required, Validators.min(0)]),
      functionalities: new FormControl<Functionality[]>([]),
      involvedUsers: new FormControl<User[]>([]),
    }, { validators: this.validateDuration });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProjectId = this.projectService.addProject(this.projectForm.value);
      this.projectForm.reset();
      this.router.navigate(['/project', newProjectId]);
    } else {
      //TODO change this alert
      alert('Fill all the fields');
    };
  };

  validateDuration(formGroup: FormGroup) {
    const durationControl = formGroup.get('duration');
    const expectedDurationControl = formGroup.get('expectedDuration');

    if (durationControl && expectedDurationControl) {
      const duration = durationControl.value;
      const expectedDuration = expectedDurationControl.value;
      return duration < expectedDuration ? null : { durationError: true };
    }
    return null;
  };

};
