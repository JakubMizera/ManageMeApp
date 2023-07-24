import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Functionality } from '../types';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private projectService: ProjectService) { }

  addFunctionality(projectId: number, functionality: Functionality): void {
    //Get project from project service
    const project = this.projectService.getProjectById(projectId);

    if (project && !project.functionalities.includes(functionality)) {
      project.functionalities.push(functionality);

      //Update project in projectService
      this.projectService.editProject(projectId, project);
    };
  };
};