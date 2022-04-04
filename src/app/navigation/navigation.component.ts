import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { MarkovskiMenu } from './menu.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay()
    );
  menus: MarkovskiMenu[] = [
    { route: 'users', label: 'Потребители', matIcon: 'groups' },
    {
      route: 'users/add-user',
      label: 'Добавяне на потребител',
      matIcon: 'add',
    },
    {
      route: 'users/edit-user',
      label: 'редактиране на потребител',
      matIcon: 'edit',
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // console.log(this.menus);
  }
}
