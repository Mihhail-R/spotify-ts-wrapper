export type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

export type ExternalUrls = {
  spotify: string;
};

export type Restrictions = {
  reason: string;
};

export type LinkedFrom = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type Copyright = {
  text: string;
  type: string;
};

export type Followers = {
  href: string | null;
  total: number;
};

export type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

export type ResumePoint = {
  fully_played: boolean;
  resume_position_ms: number;
};

export type Paginated = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};
