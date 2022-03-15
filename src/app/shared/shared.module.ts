import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule  // Necesario importarlo para que el [routerLinkActiveOptions]="{ exact: true }" del sidebar.component.html no me de error
  ]
})
export class SharedModule { }
