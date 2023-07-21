import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'project/:id', component: ProjectViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
