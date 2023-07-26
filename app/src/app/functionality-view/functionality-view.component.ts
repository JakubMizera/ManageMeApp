import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality } from '../types';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-functionality-view',
  templateUrl: './functionality-view.component.html',
  styleUrls: ['./functionality-view.component.scss'],
})
export class FunctionalityViewComponent implements OnInit {
  projectId!: number;
  functionalities: Functionality[] = [];

  constructor(
    private route: ActivatedRoute,
    private functionalityService: FunctionalityService,
    private dialog: MatDialog,
    private router: Router,
  ) {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.functionalityService.deleteFunctionality(this.projectId, functionalityId);
        this.functionalities = this.functionalityService.getAllFunctionalities(this.projectId) || [];
      }
    });
  };

  navigateToEditFunctionality(functionalityId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', 'edit', functionalityId]);
  }

}
