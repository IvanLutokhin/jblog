import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article} from "../../../models/article.model";
import {Comment} from "../../../models/comment.model";
import {ArticleService} from "../../../services/article.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  @Input() article: Article;

  accountId: number;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private auth: AuthService) { }

  ngOnInit() {
    this.getArticle();

    this.accountId = this.auth.getAccount().accountId;
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.articleService.getArticle(id).subscribe(article => this.article = article);
  }

  onCreateComment($event): void {
    const comment: Comment = $event as Comment;

    this.articleService.addComment(this.article.id, comment).subscribe((comment: Comment) => this.article.comments.push(comment));
  }

  deleteComment(comment: Comment): void {
    this.article.comments = this.article.comments.filter(c => c !== comment);

    this.articleService.deleteComment(this.article.id, comment).subscribe();
  }

}
