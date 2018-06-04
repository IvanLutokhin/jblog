import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "../../../services/article.service";
import { HttpErrorResponse } from "@angular/common/http";
import {Article} from "../../../models/article.model";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  articleCreateForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.articleCreateForm = this.fb.group({
      'header': ['', Validators.required],
      'body': ['', Validators.required],
      'tag': ['']
    });
  }

  onSubmit(): void {
    const article: Article = this.articleCreateForm.value;

    this.articleService.createArticle(article).subscribe(
      (article: Article) => { this.router.navigate(['/main']); },
      (response: HttpErrorResponse) => { console.log(response); }
    );
  }

}
