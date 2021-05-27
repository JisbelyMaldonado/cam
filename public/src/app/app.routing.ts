import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';

const routes: Routes =[
  { path: "",
  loadChildren: "./index/index.module#IndexModule", },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
       {
         path: 'messages',
         loadChildren: './modules/messages/messages.module#MessagesModule',
       },
       {
        path: 'adminBlog',
        loadChildren: './modules/blog-config/blog-config.module#BlogConfigModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
