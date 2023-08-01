import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
  };

  navigateToProjectView(id: number): void {
    this.router.navigate(['/project', id]);
  };

  navigateToProjectCreate(): void {
    this.router.navigate(['/project/add']);
  };

  navigateToProjectEdit(id: number): void {
    this.router.navigate(['/project/edit', id]);
  };

  navigateToProjectDetails(id: number): void {
    this.router.navigate(['/project/details/', id]);
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

};
