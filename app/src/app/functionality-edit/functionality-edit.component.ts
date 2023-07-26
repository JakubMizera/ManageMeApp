import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Functionality } from '../types';
import { FunctionalityService } from '../services/functionality.service';

@Component({
  selector: 'app-functionality-edit',
  templateUrl: './functionality-edit.component.html',
  styleUrls: ['./functionality-edit.component.scss']
})
export class FunctionalityEditComponent implements OnInit {
  projectId!: number;
  functionalityId!: number;
  functionalityForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));

    const functionality: Functionality | null = this.functionalityService.getFunctionalityById(this.projectId, this.functionalityId);

    if (functionality) {
      this.functionalityForm = this.formBuilder.group({
        name: new FormControl(functionality.name, Validators.required),
        description: new FormControl(functionality.description, Validators.required),
        priority: new FormControl(functionality.priority, Validators.required),
        status: new FormControl(functionality.status, Validators.required),
        startDate: new FormControl(functionality.startDate ? new Date(functionality.startDate) : new Date(), Validators.required),
        hoursWorked: new FormControl(functionality.hoursWorked),
        involvedUsers: new FormControl(functionality.involvedUsers),
        tasks: new FormControl(functionality.tasks),
      });
    } else {
      throw new Error(`Cannot find functionality with id ${this.functionalityId}`);
    };
  };

  onSubmit(): void {
    if (this.functionalityForm.valid) {
      const updatedFunctionality = { ...this.functionalityForm.value, id: this.functionalityId };
      this.functionalityService.editFunctionality(this.projectId, this.functionalityId, updatedFunctionality);
      this.router.navigate(['/project', this.projectId]);
    };
  };
}
