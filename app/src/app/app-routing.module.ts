import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { FunctionalityCreateComponent } from './functionality-create/functionality-create.component';
import { FunctionalityViewComponent } from './functionality-view/functionality-view.component';
import { FunctionalityEditComponent } from './functionality-edit/functionality-edit.component';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'project/add', component: ProjectCreateComponent },
  {
    path: 'project/:id',
    component: ProjectViewComponent,
    children: [
      { path: '', component: FunctionalityListComponent }
    ],
  },
  { path: 'project/edit/:id', component: ProjectEditComponent },
  { path: 'project/:id/functionality/add', component: FunctionalityCreateComponent },
  { path: 'project/:id/functionality/:functionalityId', component: FunctionalityViewComponent },
  { path: 'project/:id/functionality/edit/:functionalityId', component: FunctionalityEditComponent },
  { path: 'project/:id/functionality/:functionalityId/add', component: TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
