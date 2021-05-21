import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './homePage/index.component';
import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';


export const IndexRoutingModule: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "blog",
        component: BlogComponent,
      },
      {
        path: "post/:post_id",
        component: DetailBlogComponent,
      },
    ] 
  },
];
