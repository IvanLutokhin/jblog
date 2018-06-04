import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Article } from "../models/article.model";
import { Comment } from "../models/comment.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private BASE_URL: string = 'api/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.BASE_URL);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.BASE_URL, article, httpOptions);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.BASE_URL}/${id}`);
  }

  updateArticle(oldArticle: Article, newArticle: Article) : Observable<Article> {
    return this.http.put<Article>(`${this.BASE_URL}/${oldArticle.id}`, newArticle, httpOptions);
  }

  deleteArticle(article: Article): Observable<Response> {
    return this.http.delete<Response>(`${this.BASE_URL}/${article.id}`, httpOptions);
  }

  addComment(articleId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/${articleId}/comments`, comment, httpOptions);
  }

  deleteComment(articleId: number, comment: Comment): Observable<Response> {
    return this.http.delete<Response>(`${this.BASE_URL}/${articleId}/comments/${comment.id}`, httpOptions);
  }

}
