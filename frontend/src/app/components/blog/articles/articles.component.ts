import { Component, OnInit } from '@angular/core';
import { Article } from "../../../models/article.model";
import { ArticleService } from "../../../services/article.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  accountId: number;

  constructor(private articleService: ArticleService, private auth: AuthService) { }

  ngOnInit() {
    this.getArticles();

    this.accountId = this.auth.getAccount().accountId;
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(articles => { this.articles = articles });
  }

  deleteArticle(article: Article): void {
    this.articles = this.articles.filter(a => a !== article);

    this.articleService.deleteArticle(article).subscribe();
  }

}
