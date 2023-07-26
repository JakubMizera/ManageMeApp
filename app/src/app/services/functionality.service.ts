import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Functionality } from '../types';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private projectService: ProjectService) { }

  private getProjectById(projectId: number) {
    return this.projectService.getProjectById(projectId);
  };

  getAllFunctionalities(projectId: number): Functionality[] | null {
    // Get project from project service
    const project = this.projectService.getProjectById(projectId);
    if (project) {
      return project.functionalities;
    } else {
      return null;
    };
  };

  getFunctionalityById(projectId: number, functionalityId: number): Functionality | null {
    const functionalities = this.getAllFunctionalities(projectId);
    if (functionalities) {
      return functionalities.find(f => f.id === functionalityId) || null;
    } else {
      return null;
    };
  };

  addFunctionality(projectId: number, functionality: Functionality): void {
    const project = this.getProjectById(projectId);

    if (project && !project.functionalities.includes(functionality)) {
      functionality.id = Number(Date.now());
      project.functionalities.push(functionality);
      this.projectService.editProject(projectId, project);
    };
  };

  editFunctionality(projectId: number, functionalityId: number, updatedFunctionality: Functionality): void {
    const project = this.getProjectById(projectId);

    if (project) {
      const index = project.functionalities.findIndex(f => f.id === functionalityId);

      if (index !== -1) {
        updatedFunctionality.id = functionalityId;

        project.functionalities[index] = updatedFunctionality;
        this.projectService.editProject(projectId, project);
      };
    };
  };

  deleteFunctionality(projectId: number, functionalityId: number): void {
    const project = this.projectService.getProjectById(projectId);

    if (project) {
      const index = project.functionalities.findIndex(f => f.id === functionalityId);

      if (index !== -1) {
        project.functionalities.splice(index, 1);
        this.projectService.editProject(projectId, project);
      };
    };
  };

};
