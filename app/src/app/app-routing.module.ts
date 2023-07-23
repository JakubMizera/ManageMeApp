import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'project/add', component: ProjectCreateComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'project/edit/:id', component: ProjectEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
