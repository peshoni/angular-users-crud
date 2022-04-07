import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialogues/confirm-dialog/confirm-dialog.component';
import { BundleService } from 'src/app/services/bundle.service';
import { MessagesService } from 'src/app/services/mesages.service';
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
  displayedColumns = this.getDefaultColumns();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private usersService: UsersService,
    private bundle: BundleService,
    private messagesService: MessagesService
  ) {
    this.dataSource = new UsersListDataSource(usersService);
    this.attachbreakpointObserver();
  }
  getDefaultColumns() {
    return [
      'id',
      'created_at',
      'updated_at',
      'name',
      'family',
      'age',
      'gender',
      'profession',
      'actions',
    ];
  }

  attachbreakpointObserver(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe(({ matches }) => {
        if (matches) {
          this.displayedColumns = this.getDefaultColumns().filter(
            (c) => c !== 'created_at' && c !== 'updated_at'
          );
        } else {
          this.displayedColumns = this.getDefaultColumns();
        }
      });
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
    this.bundle.setUser(user);
    this.router.navigate(['users', 'edit-user']);
  }

  deleteUser(user: Users) {
    this.askUserForConfirmation().subscribe((userResponse) => {
      if (userResponse && userResponse.result === 'ok') {
        this.usersService
          .deleteUserByPk(user.id)
          .subscribe(({ errors, data }) => {
            if (errors) {
              this.messagesService.notifyUser(
                'error',
                'Something went wrong. Please excuse us.'
              );
            } else if (data) {
              this.messagesService.notifyUser(
                'success',
                'The data was deleted succesfully.'
              );
              this.dataSource.paginator.pageIndex = 0;
              this.dataSource.refresh.next(true);
            }
          });
      } else {
        // do nothing
      }
    });
  }
  private askUserForConfirmation() {
    const dialogData: any = {
      label: 'User data is about to be deleted',
      message: 'Are you sure ?',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: { dialogData },
    });
    return dialogRef.afterClosed().pipe(take(1));
  }
}
