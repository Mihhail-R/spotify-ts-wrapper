interface ClientConfig {
  baseUrl: string;
}

interface DefinedToken extends ClientConfig {
  token: string;
  clientId?: never;
  clientSecret?: never;
  authenticationUrl?: never;
}

interface ClientCredentials extends ClientConfig {
  token?: never;
  clientId: string;
  clientSecret: string;
  authenticationUrl: string;
}

export type ClientConfigurations = DefinedToken | ClientCredentials;
