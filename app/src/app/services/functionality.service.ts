import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Functionality, Status } from '../types';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private projectService: ProjectService) { }

  private getProjectById(projectId: number) {
    return this.projectService.getProjectById(projectId);
  };

  getAllFunctionalities(projectId: number): Functionality[] | null {
    const project = this.getProjectById(projectId);

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
    const functionalityId = project.functionalities.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;

    if (project && !project.functionalities.includes(functionality)) {
      functionality.id = functionalityId;
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
        // Set hours worked for functionality
        updatedFunctionality.hoursWorked = this.calculateHoursWorked(projectId);

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

  getFunctionalitiesByStatus(projectId: number, status: Status): Functionality[] | null {
    const functionalities = this.getAllFunctionalities(projectId);
    if (functionalities) {
      return functionalities.filter(f => f.status === status);
    } else {
      return null;
    };
  };

  calculateHoursWorked(projectId: number): number {
    //TODO fix this to calculate task in functioanlity not all functionalities 
    const functionalities = this.getAllFunctionalities(projectId);
    let totalHours = 0;
    if (functionalities) {
      functionalities.forEach((f => {
        f.tasks.forEach(t => {
          if (t.hoursWorked) {
            totalHours += t.hoursWorked;
          };
        });
      }));
    };

    return totalHours;
  };
};
