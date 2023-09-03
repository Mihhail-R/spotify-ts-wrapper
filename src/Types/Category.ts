import { Image } from "./GeneralTypes";

export type Category = {
  href: string;
  icons: Image[];
  id: string;
  name: string;
};

export type CategoryItems = {
  href: string;
  items: Category[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};
