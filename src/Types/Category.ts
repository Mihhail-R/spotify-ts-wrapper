import { Image, Paginated } from "./GeneralTypes";

export type Category = {
  href: string;
  icons: Image[];
  id: string;
  name: string;
};

export type CategoryItems = Paginated & {
  items: Category[];
};
