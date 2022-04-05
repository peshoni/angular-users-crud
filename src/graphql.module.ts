import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { environment } from 'src/environments/environment';

const uri = environment.hasuraUrl; // <-- URL of the GraphQL server

export function createApollo(httpLink: HttpLink): any {
  const basic = setContext((_operation, _context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(() => {
    const header = {
      // for this example: unexpiratable signed token with admin role
      //   {
      //     "sub": "access",
      //     "role": "admin",
      //     "iat": 1649059621,
      //     "https://hasura.io/jwt/claims": {
      //       "x-hasura-allowed-roles": [
      //         "admin"
      //       ],
      //       "x-hasura-default-role": "admin"
      //     },
      //     "exp": 2680617221
      //   }
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDkwNTk2MjEsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJhZG1pbiJ9LCJleHAiOjI2ODA2MTcyMjF9.tn9tdzlSfOqYZALb0y0XXdfRSTYkZqoLbMiN72ubhhM`,
      },
    };
    return header;
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache({
    typePolicies: {
      users: {
        merge: false,
      },
      Query: {
        fields: {
          users: {
            keyArgs: false,
            merge: false,
          },
        },
      },
    },
  });
  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  constructor() {}
}
