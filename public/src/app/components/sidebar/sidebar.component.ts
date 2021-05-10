import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
     { path: '/start', title: 'Estadisticas',  icon: 'trending_up', class: '' },
    //  { path: '/socialHelp', title: 'Ayuda social',  icon:'person', class: '' },
     { path: '/notifications', title: 'Notificaciones',  icon:'mark_chat_unread', class: '' },
     { path: '/topEight', title: '8 Mejores',  icon:'music_video', class: '' },
     { path: '/concourse', title: 'Concurso',  icon:'filter_tilt_shift', class: '' },
    //  { path: '/draw', title: 'Sortear',  icon:'groups', class: '' },
     { path: '/greetings', title: 'Saludos y dedicatorías',  icon:'drafts', class: '' },
     { path: '/songRequests', title: 'Peticiones de canciones.',  icon:'queue_music', class: '' },
];

export const ROUTESLOCUTOR: RouteInfo[] = [
  // { path: '/socialHelp', title: 'Ayuda social',  icon:'person', class: '' },
  { path: '/topEight', title: '8 Mejores',  icon:'music_video', class: '' },
  { path: '/concourse', title: 'Concurso',  icon:'filter_tilt_shift', class: '' },
  // { path: '/draw', title: 'Sortear',  icon:'groups', class: '' },
  { path: '/greetings', title: 'Saludos y dedicatorías',  icon:'drafts', class: '' },
  { path: '/songRequests', title: 'Peticiones de canciones.',  icon:'queue_music', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private infoUser: any;
  constructor( 
    private router: Router,) { }

  ngOnInit() {
    this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
    console.log(this.infoUser);
    if (this.infoUser) {
      if (this.infoUser.type_user == 1) {
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
      } 
      if(this.infoUser.type_user == 2) {
        this.menuItems = ROUTESLOCUTOR.filter((menuItem) => menuItem);
      } 
    }
  }
  isMobileMenu() {
       if ($(window).width() > 991) {
           return false;
       }
       return true;
  };

  // public async logout() {
  //   await this.authService.logout();
  //   this.router.navigate([''])
  //   }
}
