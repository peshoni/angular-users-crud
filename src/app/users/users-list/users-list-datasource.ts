import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { GetUsersQuery, Users, Users_Order_By } from 'src/generated/graphql';
import { UsersService } from '../users.service';

/**
 * Data source for the UsersList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersListDataSource extends DataSource<Users> {
  paginator: MatPaginator;
  counter: BehaviorSubject<number> = new BehaviorSubject(0);
  sort: MatSort;
  queryRef: QueryRef<GetUsersQuery>;
  loading: BehaviorSubject<any> = new BehaviorSubject(true);
  loading$ = this.loading.asObservable();
  refresh: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private usersService: UsersService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Users[] | any> {
    const limit: number = this.paginator.pageSize;
    const offset: number = this.paginator.pageIndex * this.paginator.pageSize;
    const order_by: Users_Order_By = {}; // { name: Order_By.Asc };
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    this.queryRef = this.usersService.getUsers(limit, offset, order_by);
    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange,
      this.refresh,
    ];

    return merge(...dataMutations).pipe(
      startWith({}),
      tap(() => this.loading.next(true)),
      switchMap((fromWhere) => {
        let order: any; //= new Object({});
        if (this.sort.active && this.sort.active.length > 0) {
          order = new Object({});
          const field = this.sort.active;

          this.sort.direction.indexOf('sc') !== -1
            ? (order[this.sort.active] = this.sort.direction)
            : (order = {});
        }

        if (Object.keys(fromWhere).indexOf('data') < 0) {
          return this.queryRef.refetch({
            limit: this.paginator.pageSize,
            offset: this.paginator.pageIndex * this.paginator.pageSize,
            orderBy: order ? order : order_by,
          });
        } else {
          return this.queryRef.valueChanges;
        }
      }),
      map(({ data, loading, errors }) => {
        this.loading.next(loading);
        if (errors) {
          console.log(errors);
          const errorMessage = errors[0].message;
          console.log(errorMessage);
          if (errorMessage.includes('query_root')) {
            // this.snackBar.open(
            //   'You do not have the necessary permissions to access this data!',
            //   'OK',
            //   { duration: 2000 }
            // );
          }
          throw Error(errorMessage);
        }
        this.loading.next(false);
        this.counter.next(data.users_aggregate.aggregate.count);
        return data.users;
      })
    );
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
}
