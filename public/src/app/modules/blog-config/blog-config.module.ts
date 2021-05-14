import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogConfigComponent } from './blog-config/blog-config.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [{path: "", component: BlogConfigComponent}]

@NgModule({
  declarations: [BlogConfigComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    AngularEditorModule
  ]
})
export class BlogConfigModule { }
