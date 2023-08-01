import { Component, OnInit } from '@angular/core';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality, Status } from '../types';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  functionalities: Functionality[] = [];

  constructor(
    private functionalityService: FunctionalityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
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

  deleteFunctionality(functionalityId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.functionalityService.deleteFunctionality(this.projectId, functionalityId);
        this.getFunctionalities();
      }
    });
  };

  navigateToFunctionalityCreate(id: number): void {
    this.router.navigate(['project', id, 'functionality', 'add']);
  };

  navigateToEditFunctionality(functionalityId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', 'edit', functionalityId]);
  };

  navigateToFunctionalityDetails(functionalityId: number): void {
    this.router.navigate(['/project', this.projectId, 'functionality', functionalityId]);
  };

  navigateToCreateTask(functionalityId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', functionalityId, 'add']);
  };

  navigateToTaskDetails(functionalityId: number, taskId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', functionalityId, 'task', taskId]);
  };
}
