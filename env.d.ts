declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_APP_BACKEND_DOMAIN: string;
      NEXT_PUBLIC_APP_GRAPHQL_ENDPOINT: string;
      NEXT_PUBLIC_GRAPHQL_API: string;
    }
  }
}

export { };
