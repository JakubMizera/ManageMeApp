import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      duration: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
      expectedDuration: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
      hoursWorked: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      functionalities: new FormControl<Functionality[]>([]),
      involvedUsers: new FormControl<User[]>([]),
    }, { validators: this.projectService.validateDuration } as AbstractControlOptions);
  };

  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProjectId = this.projectService.addProject(this.projectForm.value);
      this.projectForm.reset();
      this.router.navigate(['/project', newProjectId]);
    }
  };

};
