import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality, Priority, Status } from '../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functionality-create',
  templateUrl: './functionality-create.component.html',
  styleUrls: ['./functionality-create.component.scss']
})
export class FunctionalityCreateComponent implements OnInit {
  functionalityForm!: FormGroup;
  projectId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      status: [Status.TODO, Validators.required],
      addedDate: [new Date(), Validators.required],
      // TODO start date zaczyna sie wtedy kiedy status jest zmieniony z "todo" na "doing"
      startDate: ['', Validators.required],
      hoursWorked: ['', [Validators.required, Validators.min(0)]],
      involvedUsers: [[]],
      tasks: [[]],
    });
  };

  onSubmit(): void {
    if (this.functionalityForm.valid) {
      const newFunctionality: Functionality = this.functionalityForm.value;
      this.functionalityService.addFunctionality(this.projectId, newFunctionality);
      this.functionalityForm.reset();
      // TODO navigate to functionalities view
      this.router.navigate([]);
    };
  };
};
