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


@NgModule({
  declarations: [IndexComponent, FooterLandingPageComponent],
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
