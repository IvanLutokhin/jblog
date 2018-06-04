import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LoginRequest } from "../../models/login-request.model";
import { LoginResponse } from "../../models/login-response.model";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  message: string = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit(): void {
    const loginRequest: LoginRequest = this.loginForm.value;

    this.auth.login(loginRequest).subscribe(
      (loginResponse: LoginResponse) => { this.router.navigate(['/main']); },
      (response: HttpErrorResponse) => { console.log(response); this.message = response.error.message; }
    );
  }

}
