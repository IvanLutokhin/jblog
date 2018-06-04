import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account.model";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  message: string = null;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      'username': ['', Validators.required],
      'password_group': this.fb.group({
        'password': ['', Validators.required],
        'confirm_password': ['', Validators.required],
      }, { validator: this.equal }),
      'email': ['']
    });
  }

  onSubmit(): void {
    const account: Account = {
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('password_group').get('password').value,
      email: this.registrationForm.get('email').value
    };

    this.accountService.createAccount(account).subscribe(
      (account: Account) => { this.message = `Account '${account.username}' registered successfully`; },
      (response: HttpErrorResponse) => { console.log(response); this.message = response.error.message; }
    );

    this.registrationForm.reset();
  }

  equal(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
  }

}
