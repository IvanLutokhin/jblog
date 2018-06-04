import { Article } from "./article.model";

export class Account {
  id?: number;
  username: string;
  password?: string;
  email: string;
  articles?: Article[];
}
