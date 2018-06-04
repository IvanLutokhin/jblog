import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { TokenHttpInterceptor } from "./interceptors/token-http-interceptor";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MainComponent } from './components/main/main.component';
import { ArticlesComponent } from './components/blog/articles/articles.component';
import { ArticleDetailComponent } from './components/blog/article-detail/article-detail.component';
import { ArticleCreateComponent } from './components/blog/article-create/article-create.component';
import { ArticleUpdateComponent } from './components/blog/article-update/article-update.component';
import { CommentCreateComponent } from './components/blog/comment-create/comment-create.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent,
    MainComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    ArticleUpdateComponent,
    CommentCreateComponent,
    AccountDetailComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
