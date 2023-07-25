import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality } from '../types';

@Component({
  selector: 'app-functionality-view',
  templateUrl: './functionality-view.component.html',
  styleUrls: ['./functionality-view.component.scss']
})
export class FunctionalityViewComponent implements OnInit {
  projectId!: number;
  functionalities: Functionality[] = [];

  constructor(private route: ActivatedRoute, private functionalityService: FunctionalityService) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    const functionalities = this.functionalityService.getAllFunctionalities(this.projectId);
    if (functionalities) {
      this.functionalities = functionalities;
    } else {
      console.error('No functionalities found for project with id: ', this.projectId);
    };
  };

  deleteFunctionality(functionalityId: number): void {
    const confirmation = confirm('Are you sure you want to delete this functionality?');

    if (confirmation) {
      console.log(functionalityId);
      this.functionalityService.deleteFunctionality(this.projectId, functionalityId);
      // After deletion, update the functionalities list
      this.functionalities = this.functionalityService.getAllFunctionalities(this.projectId) || [];
    };
  };
}
