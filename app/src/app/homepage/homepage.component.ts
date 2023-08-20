import { Component, OnInit } from '@angular/core';
import { Project, User } from '../types';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projects!: Project[];
  loggedInUser!: User | null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    if (this.loggedInUser) {
      console.log(this.loggedInUser.id);
      this.projects = this.projectService.getProjectsByUser(this.loggedInUser);
      console.log(this.projects);
    };
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
