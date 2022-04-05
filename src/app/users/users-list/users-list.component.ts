import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BundleService } from 'src/app/services/bundle.service';
import { Users } from 'src/generated/graphql';
import { UsersService } from '../users.service';
import { UsersListDataSource } from './users-list-datasource';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Users>;
  dataSource: UsersListDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'created_at',
    'updated_at',
    'name',
    'family',
    'actions',
  ];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private bundle: BundleService
  ) {
    this.dataSource = new UsersListDataSource(usersService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  addUser() {
    this.router.navigate(['users', 'add-user']);
  }

  editUser(user: Users) {
    console.log('EDIT');
    console.log(user);
    this.bundle.setUser(user);
    this.router.navigate(['users', 'edit-user']);
    // this.router.navigateByUrl('users/edit-user');
  }

  deleteUser(user: Users) {
    console.log('DELETE');
    console.log(user);
    this.usersService.deleteUserByPk(user.id).subscribe((response) => {
      console.log(response);
      console.log('NAVIGATE');
      this.router.navigateByUrl('users');
    });
  }
}
