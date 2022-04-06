import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from 'src/app/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      // { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
