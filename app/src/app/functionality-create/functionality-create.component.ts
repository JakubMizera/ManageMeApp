import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality, Priority, Status } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-functionality-create',
  templateUrl: './functionality-create.component.html',
  styleUrls: ['./functionality-create.component.scss']
})
export class FunctionalityCreateComponent implements OnInit {
  functionalityForm!: FormGroup;
  projectId!: number;
  projectName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      status: [Status.TODO],
      addedDate: [new Date(), Validators.required],
      startDate: [],
      hoursWorked: [0],
      involvedUsers: [[]],
      tasks: [[]],
    });

    this.setProjectName();
  };

  onSubmit(): void {
    if (this.functionalityForm.valid) {
      const newFunctionality: Functionality = this.functionalityForm.value;
      this.functionalityService.addFunctionality(this.projectId, newFunctionality);
      this.functionalityForm.reset();
      this.router.navigate(['/project', this.projectId]);
    };
  };

  setProjectName() {
    this.projectName = this.projectService.getProjectById(this.projectId).name;
  }
};
