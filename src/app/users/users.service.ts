import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { QueryRef } from 'apollo-angular/query-ref';
import { Observable } from 'rxjs';
import {
  AddUserGQL,
  AddUserMutation,
  DeleteUserByPkGQL,
  DeleteUserByPkMutation,
  GetUsersGQL,
  GetUsersQuery,
  UpdateUserGQL,
  UpdateUserMutation,
  Users_Insert_Input,
  Users_Order_By,
  Users_Set_Input,
} from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private getUsersGQL: GetUsersGQL,
    private addUserGQL: AddUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserByPkGQL: DeleteUserByPkGQL
  ) {}

  getUsers(
    limit = 10,
    offset = 0,
    orderBy: Users_Order_By
  ): QueryRef<GetUsersQuery> {
    return this.getUsersGQL.watch(
      { limit, offset, orderBy },
      {
        fetchPolicy: 'network-only',
        partialRefetch: true,
        errorPolicy: 'all',
        pollInterval: 30 * 1000,
      }
    );
  }

  public addUser(
    user_insert_input: Users_Insert_Input
  ): Observable<
    FetchResult<AddUserMutation, Record<string, any>, Record<string, any>>
  > {
    return this.addUserGQL.mutate({ user_insert_input });
  }
  public updateUser(
    id: number,
    user_set_input: Users_Set_Input
  ): Observable<
    FetchResult<UpdateUserMutation, Record<string, any>, Record<string, any>>
  > {
    return this.updateUserGQL.mutate({ id, user_set_input });
  }
  public deleteUserByPk(
    id: number
  ): Observable<
    FetchResult<
      DeleteUserByPkMutation,
      Record<string, any>,
      Record<string, any>
    >
  > {
    return this.deleteUserByPkGQL.mutate({ id });
  }
}
