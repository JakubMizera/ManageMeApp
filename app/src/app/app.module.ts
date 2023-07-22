import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { DatePipe } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProjectViewComponent,
    ProjectCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
