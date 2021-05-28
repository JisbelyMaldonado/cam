import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './homePage/index.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IndexRoutingModule } from './index-routing.module';
import { FooterLandingPageComponent } from './footer-landing-page/footer-landing-page.component';
import {MatSelectModule} from '@angular/material/select';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogComponent } from './blog/blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { LoginLandingComponent } from './login-landing/login-landing.component';
import { ModalContactMailComponent } from './modal-contact-mail/modal-contact-mail.component';
import { FixedElementWhatsappComponent } from './fixed-element-whatsapp/fixed-element-whatsapp.component';


@NgModule({
  declarations: [IndexComponent, FooterLandingPageComponent, NavbarComponent, BlogComponent, DetailBlogComponent, LoginLandingComponent, ModalContactMailComponent, FixedElementWhatsappComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutingModule),

    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
    
  ]
})
export class IndexModule { }
