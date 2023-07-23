import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Functionality, User } from '../types';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectId!: number;
  projectForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    const project = this.projectService.getProjectById(this.projectId);
    if (project) {
      this.projectForm = this.formBuilder.group({
        name: new FormControl(project.name, Validators.required),
        description: new FormControl(project.description, Validators.required),
        startDate: new FormControl(new Date(project.startDate), Validators.required),
        duration: new FormControl<number | null>(project.duration, [Validators.required, Validators.min(1)]),
        expectedDuration: new FormControl<number | null>(project.expectedDuration, [Validators.required, Validators.min(1)]),
        hoursWorked: new FormControl<number | null>(project.hoursWorked, [Validators.required, Validators.min(0)]),
        functionalities: new FormControl<Functionality[]>(project.functionalities),
        involvedUsers: new FormControl<User[]>(project.involvedUsers),
      }, { validators: this.validateDuration } as AbstractControlOptions);
    } else {
      // TODO: Handle case when project not found
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const updatedProject = { ...this.projectForm.value, id: this.projectId };
      this.projectService.editProject(this.projectId, updatedProject);
      this.router.navigate(['/project', this.projectId]);
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
