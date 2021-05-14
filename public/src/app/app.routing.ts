import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';

const routes: Routes =[
  { path: "",
  loadChildren: "./index/index.module#IndexModule", },
  // { path: "login", component: LoginComponent },
  // { path: "", component: LoginComponent },
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
      //   {
      //    path: 'socialHelp',
      //    loadChildren: './modules/socialHelp/social-help.module#SocialHelpModule',
      //  },
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
