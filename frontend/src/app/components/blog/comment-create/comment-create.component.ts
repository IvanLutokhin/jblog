import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Comment } from "../../../models/comment.model";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  commentCreateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.commentCreateForm = this.fb.group({
      'author': ['', Validators.required],
      'email': ['', Validators.required],
      'text': ['', Validators.required]
    });
  }

  onSubmit(): void {
    const comment: Comment = this.commentCreateForm.value;

    this.create.emit(comment);
  }

}
