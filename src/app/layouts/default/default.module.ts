import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
@NgModule({
  declarations: [DefaultComponent, NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    DefaultRoutingModule,
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
})
export class DefaultModule {}
