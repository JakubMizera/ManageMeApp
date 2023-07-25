import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { DatePipe } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { FunctionalityCreateComponent } from './functionality-create/functionality-create.component';
import { FunctionalityViewComponent } from './functionality-view/functionality-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProjectViewComponent,
    ProjectCreateComponent,
    NavigationComponent,
    ProjectEditComponent,
    FunctionalityCreateComponent,
    FunctionalityViewComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
  export class AppModule { }
