module.exports = {
  schema: [
    {
      "http://127.0.0.1:8081/v1/graphql": {
        headers: {
          "X-Hasura-Admin-Secret":
            "iOiJIUzI1NiIsInR5cCeyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBlcGUiLCJhZG1pbiI6dHJ1ZSwia",
        },
      },
    },
  ],
  documents: ["src/**/*.graphql"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-apollo-angular",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
