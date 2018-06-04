import { Account } from "./account.model";
import { Comment } from "./comment.model";

export class Article {
  id?: number;
  header: string;
  body: string;
  tag: string;
  account?: Account;
  comments?: Comment[];
}
