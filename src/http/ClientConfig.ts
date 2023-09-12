export type ClientConfigConfigurations = {
  baseUrl: string;
} & (
  | {
      token: string;
      authenticationUrl: never;
      clientId: never;
      clientSecret: never;
    }
  | {
      token: never;
      authenticationUrl: string;
      clientId: string;
      clientSecret: string;
    }
);
