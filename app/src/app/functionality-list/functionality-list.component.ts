import { Component, OnInit } from '@angular/core';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute } from '@angular/router';
import { Functionality, Status } from '../types';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss']
})
export class FunctionalityListComponent implements OnInit {
  todoFunctionalities: Functionality[] = [];
  doingFunctionalities: Functionality[] = [];
  doneFunctionalities: Functionality[] = [];
  projectId: number;

  Status = Status;

  constructor(
    private functionalityService: FunctionalityService,
    private route: ActivatedRoute
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getFunctionalities();
  };

  getFunctionalities() {
    this.todoFunctionalities = this.functionalityService.getFunctionalitiesByStatus(this.projectId, Status.TODO) || [];
    this.doingFunctionalities = this.functionalityService.getFunctionalitiesByStatus(this.projectId, Status.DOING) || [];
    this.doneFunctionalities = this.functionalityService.getFunctionalitiesByStatus(this.projectId, Status.DONE) || [];
  };

  onStatusChange(functionality: Functionality, status: Status) {
    functionality.status = status;
    this.functionalityService.editFunctionality(this.projectId, functionality.id, functionality);
    this.getFunctionalities();  
  };
}
