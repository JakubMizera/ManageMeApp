import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../types';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  project!: Project;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  //TODO -> przewidywany czas trwania wyliczony z funkcjonalności; liczba wykonanych roboczogodzin wyliczona z zadań; zaangażowane osoby = osoby przypisane do zadań i funkcjonalności

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId === null) {
      throw new Error(`Cannot find project with id ${projectId}`);
    };
    this.project = this.projectService.getProjectById(projectId);
  };

  navigateToProjectEdit(id: number): void {
    this.router.navigate(['/project/edit', id]);
  };

  deleteProject(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id);
        this.router.navigate(['/']);
      };
    });
  };

  navigateToProjectDetails(id: number): void {
    this.router.navigate(['/project/details/', id]);
  }

};
