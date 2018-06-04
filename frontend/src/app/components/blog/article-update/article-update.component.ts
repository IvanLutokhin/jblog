import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../models/article.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleService} from "../../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  @Input() article: Article;

  articleUpdateForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getArticle();

    this.articleUpdateForm = this.fb.group({
      'header': ['', Validators.required],
      'body': ['', Validators.required],
      'tag': ['']
    });
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.articleService.getArticle(id).subscribe(article => this.article = article);
  }

  onSubmit(): void {
    const newArticle: Article = this.articleUpdateForm.value;

    this.articleService.updateArticle(this.article, newArticle).subscribe(
      (article: Article) => { this.router.navigate(['/articles', article.id]); },
      (response: HttpErrorResponse) => { console.log(response); }
    );
  }

}
